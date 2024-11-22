"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [grades, setGrades] = useState<{ [subject: string]: number }>({});
  const [backNavigationStack, setBackNavigationStack] = useState<string[]>([]);

  // Load classes and students from localStorage based on selected class type
  useEffect(() => {
    if (selectedClassType) {
      const storedClasses = JSON.parse(
        localStorage.getItem(`${selectedClassType}_classes`) || "[]"
      );
      const storedStudents = JSON.parse(
        localStorage.getItem(`${selectedClassType}_students`) || "[]"
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
    setBackNavigationStack(["classType"]); // Push class type to back stack
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

  const handleAddSubject = () => {
    const trimmedSubject = newSubject.trim();
    if (trimmedSubject && !subjects.includes(trimmedSubject)) {
      setSubjects((prevSubjects) => [...prevSubjects, trimmedSubject]);
      setGrades((prevGrades) => ({ ...prevGrades, [trimmedSubject]: 0 })); // Initialize grade
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    setSubjects(subjects.filter((subj) => subj !== subjectToRemove));
    const newGrades = { ...grades };
    delete newGrades[subjectToRemove]; // Remove corresponding grade
    setGrades(newGrades);
  };

  const handleGradeChange = (subject: string, value: number) => {
    setGrades((prevGrades) => ({ ...prevGrades, [subject]: value }));
  };

  const handleSaveGrades = () => {
    console.log("Grades Saved:", { student: selectedStudent, grades });
    alert("Data nilai tersimpan!");
    router.push(`/nilai/${userId}`); // Navigate to the grades page
    setGrades({});
    setSelectedStudent(null);
  };

  const handleBackNavigation = () => {
    const lastPage = backNavigationStack.pop();
    if (lastPage === "students") {
      setSelectedStudent(null);
    } else if (lastPage === "classes") {
      setSelectedClass(null);
    } else if (lastPage === "classType") {
      setSelectedClassType(null);
      setClasses([]); // Reset classes when navigating back to class type selection
      setStudents([]); // Reset students as well
    }
    setBackNavigationStack([...backNavigationStack]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (selectedClass) {
        handleAddStudent(); // Add student on Enter if in student management
      } else if (selectedStudent) {
        handleAddSubject(); // Add subject on Enter if in grade entry
      } else {
        handleAddClass(); // Add class on Enter if in class management
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

        {/* Grade Entry */}
        {selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Input Nilai untuk: {selectedStudent}
            </h2>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tambah Mata Pelajaran"
              className="border p-2 mb-4 w-full"
            />
            <button
              onClick={handleAddSubject}
              className="bg-[#4CAF50] text-white px-4 py-2 rounded mb-4"
            >
              Tambah Mata Pelajaran
            </button>

            <ul className="list-disc pl-5">
              {subjects.map((subject) => (
                <li key={subject} className="flex justify-between items-center">
                  <span>{subject}</span>
                  <input
                    type="number"
                    value={grades[subject] || ""}
                    onChange={(e) =>
                      handleGradeChange(subject, parseFloat(e.target.value))
                    }
                    placeholder="Nilai"
                    className="border p-1 ml-2"
                  />
                  <button
                    onClick={() => handleRemoveSubject(subject)}
                    className="text-red-500 ml-2"
                  >
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleSaveGrades}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Simpan Nilai
            </button>
          </div>
        )}

        {/* Kembali Button */}
        <button
          onClick={handleBackNavigation}
          className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Kembali
        </button>
      </div>
    </main>
  );
};

export default AdminDashboard;
