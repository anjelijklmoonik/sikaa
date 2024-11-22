"use client";

import { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation"; // Ensure this is imported

const AdminDashboard = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // State variables
  const [selectedClassType, setSelectedClassType] = useState<string | null>(
    null
  );
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<string[]>([]);
  const [newStudent, setNewStudent] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState({
    date: "",
    subject: "",
    status: "present",
  });
  const [chapelAttendance, setChapelAttendance] = useState("present");
  const [backNavigationStack, setBackNavigationStack] = useState<string[]>([]);

  // Load classes and students from localStorage based on selected class type
  useEffect(() => {
    if (selectedClassType) {
      const storedClasses = JSON.parse(
        localStorage.getItem(`${selectedClassType}classes`) || "[]"
      );
      const storedStudents = JSON.parse(
        localStorage.getItem(`${selectedClassType}students`) || "[]"
      );
      setClasses(storedClasses);
      setStudents(storedStudents);
    }
  }, [selectedClassType]);

  // Save classes and students to localStorage when they change
  useEffect(() => {
    if (selectedClassType) {
      localStorage.setItem(
        `${selectedClassType}_classes`,
        JSON.stringify(classes)
      );
      localStorage.setItem(
        `${selectedClassType}_students`,
        JSON.stringify(students)
      );
    }
  }, [classes, students, selectedClassType]);

  // Handlers
  const handleClassSelect = (classType: string) => {
    setSelectedClassType(classType);
    setSelectedClass(null);
    setStudents([]);
    setBackNavigationStack(["classType"]);
  };

  const handleAddClass = () => {
    const trimmedClass = newClass.trim();
    if (trimmedClass && !classes.includes(trimmedClass)) {
      setClasses((prevClasses) => {
        const updatedClasses = [...prevClasses, trimmedClass];
        return updatedClasses.sort((a, b) => a.localeCompare(b));
      });
      setNewClass("");
    }
  };

  const handleRemoveClass = (classToRemove: string) => {
    setClasses(classes.filter((cls) => cls !== classToRemove));
  };

  const handleSelectClass = (className: string) => {
    setSelectedClass(className);
    setBackNavigationStack((prev) => [...prev, "classes"]);
  };

  const handleAddStudent = () => {
    const trimmedStudent = newStudent.trim();
    if (trimmedStudent && !students.includes(trimmedStudent)) {
      setStudents((prevStudents) => {
        const updatedStudents = [...prevStudents, trimmedStudent];
        return updatedStudents.sort((a, b) => a.localeCompare(b));
      });
      setNewStudent("");
    }
  };

  const handleRemoveStudent = (studentToRemove: string) => {
    setStudents(students.filter((student) => student !== studentToRemove));
  };

  const handleSelectStudent = (student: string) => {
    setSelectedStudent(student);
    setBackNavigationStack((prev) => [...prev, "students"]);
  };

  const handleAttendanceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChapelAttendanceChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setChapelAttendance(e.target.value);
  };

  const handleSaveClassAttendance = () => {
    console.log("Class Attendance Data Saved:", {
      student: selectedStudent,
      attendanceData,
    });
    alert(`Absen kelas untuk ${selectedStudent}, tersimpan!`);
    setAttendanceData({
      date: "",
      subject: "",
      status: "present",
    });
    setSelectedStudent(null);

    // Navigate to the main attendance page
    router.push(`/absen/${userId}`); // Replace with the correct path for your attendance page
  };

  const handleSaveChapelAttendance = () => {
    console.log("Chapel Attendance Data Saved:", {
      student: selectedStudent,
      chapelAttendance,
    });
    alert(`Absen chapel untuk ${selectedStudent} tersimpan!`);
    setChapelAttendance("present");
    setSelectedStudent(null);

    // Navigate to the main attendance page
    router.push("/absen"); // Replace with the correct path for your attendance page
  };

  const handleBackNavigation = () => {
    const lastPage = backNavigationStack.pop();
    if (lastPage === "students") {
      setSelectedStudent(null);
    } else if (lastPage === "classes") {
      setSelectedClass(null);
    } else if (lastPage === "classType") {
      setSelectedClassType(null);
      setClasses([]);
      setStudents([]);
    }
    setBackNavigationStack([...backNavigationStack]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedClass) {
        handleAddStudent();
      } else {
        handleAddClass();
      }
    }
  };

  return (
    <main className="flex flex-row min-h-screen bg-[#f5f5dc] bg-opacity-20">
      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

        {/* Class Type Selection */}
        {!selectedClassType && (
          <div className="flex flex-col mb-4">
            <h2 className="text-2xl font-bold mb-4">Pilih Tipe Kelas</h2>
            <button
              onClick={() => handleClassSelect("SMA")}
              className="bg-[#f9b75e] text-white px-4 py-2 rounded mb-2"
            >
              SMA
            </button>
            <button
              onClick={() => handleClassSelect("SMK")}
              className="bg-[#f9b75e] text-white px-4 py-2 rounded"
            >
              SMK
            </button>
          </div>
        )}

        {/* Class Management */}
        {selectedClassType && !selectedClass && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Daftar Kelas ({selectedClassType})
            </h2>
            <div className="flex flex-col mb-4">
              {classes.map((cls) => (
                <div
                  key={cls}
                  className="flex items-center justify-between border-b py-2"
                  onClick={() => handleSelectClass(cls)}
                >
                  <span>{cls}</span>
                  <button
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveClass(cls);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tambahkan Kelas"
              className="border rounded px-2 py-1 mb-2 w-full"
            />
            <button
              className="bg-[#f9b75e] text-white px-4 py-2 rounded"
              onClick={handleAddClass}
            >
              Tambahkan Kelas
            </button>
          </div>
        )}

        {/* Student Management */}
        {selectedClass && !selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Daftar Siswa ({selectedClass})
            </h2>
            <div className="flex flex-col mb-4">
              {students.map((student) => (
                <div
                  key={student}
                  className="flex items-center justify-between border-b py-2"
                  onClick={() => handleSelectStudent(student)}
                >
                  <span>{student}</span>
                  <button
                    className="text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStudent(student);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tambahkan Siswa"
              className="border rounded px-2 py-1 mb-2 w-full"
            />
            <button
              className="bg-[#f9b75e] text-white px-4 py-2 rounded"
              onClick={handleAddStudent}
            >
              Tambahkan Siswa
            </button>
          </div>
        )}

        {/* Attendance Form */}
        {selectedStudent && (
          <div className="flex flex-col mb-4">
            <h2 className="text-2xl font-bold mb-4">
              Absen untuk {selectedStudent}
            </h2>
            <input
              type="date"
              name="date"
              value={attendanceData.date}
              onChange={handleAttendanceChange}
              className="border p-2 mb-2"
            />
            <input
              type="text"
              name="subject"
              value={attendanceData.subject}
              onChange={handleAttendanceChange}
              placeholder="Mata Pelajaran"
              className="border p-2 mb-2"
            />
            <select
              name="status"
              value={attendanceData.status}
              onChange={handleAttendanceChange}
              className="border p-2 mb-2"
            >
              <option value="present">Hadir</option>
              <option value="absent">Tidak Hadir</option>
              <option value="sick">Sakit</option>
              <option value="izin">Izin</option>
            </select>
            <button
              onClick={handleSaveClassAttendance}
              className="bg-[#f9b75e] text-white px-4 py-2 rounded mb-2"
            >
              Simpan Absen Kelas
            </button>

            <h2 className="text-2xl font-bold mb-4">Absen Chapel</h2>
            <select
              value={chapelAttendance}
              onChange={handleChapelAttendanceChange}
              className="border p-2 mb-2"
            >
              <option value="present">Hadir</option>
              <option value="absent">Tidak Hadir</option>
              <option value="sick">Sakit</option>
              <option value="Izin">Izin</option>
            </select>
            <button
              onClick={handleSaveChapelAttendance}
              className="bg-[#f9b75e] text-white px-4 py-2 rounded mb-2"
            >
              Simpan Absen Chapel
            </button>
          </div>
        )}

        {/* Back Navigation Button */}
        <div className="fixed bottom-0 left-0 p-4">
          <button
            onClick={handleBackNavigation}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Kembali
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
