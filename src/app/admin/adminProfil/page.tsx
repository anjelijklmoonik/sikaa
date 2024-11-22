"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // State variables
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>(["2023", "2024", "2025"]);
  const [newYear, setNewYear] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [newClass, setNewClass] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [students, setStudents] = useState<string[]>([]);
  const [newStudent, setNewStudent] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [backNavigationStack, setBackNavigationStack] = useState<string[]>([]);

  // Student profile
  const [studentProfile, setStudentProfile] = useState({
    name: "",
    studentID: "",
    school: "",
    className: "",
    major: "",
    dob: "",
    religion: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    parentInfo: {
      fatherName: "",
      motherName: "",
      guardianName: "",
      fatherPhone: "",
      motherPhone: "",
      guardianPhone: "",
    },
  });

  // Load classes and students from localStorage
  useEffect(() => {
    if (selectedYear) {
      const storedClasses = JSON.parse(
        localStorage.getItem(`${selectedYear}_classes`) || "[]"
      );
      const storedStudents = JSON.parse(
        localStorage.getItem(`${selectedYear}_students`) || "[]"
      );
      setClasses(storedClasses);
      setStudents(storedStudents);
    }
  }, [selectedYear]);

  // Save to localStorage when changes occur
  useEffect(() => {
    if (selectedYear) {
      localStorage.setItem(`${selectedYear}_classes`, JSON.stringify(classes));
      localStorage.setItem(
        `${selectedYear}_students`,
        JSON.stringify(students)
      );
    }
  }, [classes, students, selectedYear]);

  // Handlers
  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setSelectedClass(null);
    setStudents([]);
    setBackNavigationStack(["year"]);
  };

  const handleAddYear = () => {
    if (newYear.trim() && !years.includes(newYear.trim())) {
      const updatedYears = [...years, newYear.trim()];
      setYears(updatedYears);
      localStorage.setItem("years", JSON.stringify(updatedYears));
      setNewYear("");
    }
  };

  const handleAddClass = () => {
    if (newClass.trim() && !classes.includes(newClass.trim())) {
      const updatedClasses = [...classes, newClass.trim()].sort();
      setClasses(updatedClasses);
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
    if (newStudent.trim() && !students.includes(newStudent.trim())) {
      const updatedStudents = [...students, newStudent.trim()].sort();
      setStudents(updatedStudents);
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

  const handleBackNavigation = () => {
    const lastPage = backNavigationStack.pop();
    if (lastPage === "students") {
      setSelectedStudent(null);
    } else if (lastPage === "classes") {
      setSelectedClass(null);
    } else if (lastPage === "year") {
      setSelectedYear(null);
      setClasses([]);
      setStudents([]);
    }
    setBackNavigationStack([...backNavigationStack]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    console.log("Profil Siswa:", studentProfile);
    alert("Profil Siswa Berhasil Disimpan!");
    setStudentProfile({
      name: "",
      studentID: "",
      school: "",
      className: "",
      major: "",
      dob: "",
      religion: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      parentInfo: {
        fatherName: "",
        motherName: "",
        guardianName: "",
        fatherPhone: "",
        motherPhone: "",
        guardianPhone: "",
      },
    });
    setSelectedStudent(null);
  };

  return (
    <main className="flex flex-row min-h-screen bg-[#f5f5dc] bg-opacity-20">
      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

        {/* Profil Siswa */}
        {selectedStudent && (
          <section>
            <h2 className="text-xl font-semibold">
              Profil Siswa: {selectedStudent}
            </h2>
            <div>
              <input
                type="text"
                name="name"
                value={studentProfile.name}
                onChange={handleInputChange}
                placeholder="Nama Lengkap"
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="studentID"
                value={studentProfile.studentID}
                onChange={handleInputChange}
                placeholder="Nomor Induk Siswa"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="school"
                value={studentProfile.school}
                onChange={handleInputChange}
                placeholder="Sekolah"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="className"
                value={studentProfile.className}
                onChange={handleInputChange}
                placeholder="Kelas"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="major"
                value={studentProfile.major}
                onChange={handleInputChange}
                placeholder="Jurusan"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="dob"
                value={studentProfile.dob}
                onChange={handleInputChange}
                placeholder="Tanggal Lahir"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="religion"
                value={studentProfile.religion}
                onChange={handleInputChange}
                placeholder="Agama"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="gender"
                value={studentProfile.gender}
                onChange={handleInputChange}
                placeholder="Jenis Kelamin"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="address"
                value={studentProfile.address}
                onChange={handleInputChange}
                placeholder="Alamat"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="phone"
                value={studentProfile.phone}
                onChange={handleInputChange}
                placeholder="Nomor Telepon"
                className="p-2 border rounded mt-2"
              />
              <input
                type="email"
                name="email"
                value={studentProfile.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="p-2 border rounded mt-2"
              />
              {/* Parent Info */}
              <h3 className="font-semibold mt-4">Informasi Orang Tua</h3>
              <input
                type="text"
                name="parentInfo.fatherName"
                value={studentProfile.parentInfo.fatherName}
                onChange={handleInputChange}
                placeholder="Nama Ayah"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="parentInfo.motherName"
                value={studentProfile.parentInfo.motherName}
                onChange={handleInputChange}
                placeholder="Nama Ibu"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="parentInfo.guardianName"
                value={studentProfile.parentInfo.guardianName}
                onChange={handleInputChange}
                placeholder="Nama Wali"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="parentInfo.fatherPhone"
                value={studentProfile.parentInfo.fatherPhone}
                onChange={handleInputChange}
                placeholder="Nomor Telepon Ayah"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="parentInfo.motherPhone"
                value={studentProfile.parentInfo.motherPhone}
                onChange={handleInputChange}
                placeholder="Nomor Telepon Ibu"
                className="p-2 border rounded mt-2"
              />
              <input
                type="text"
                name="parentInfo.guardianPhone"
                value={studentProfile.parentInfo.guardianPhone}
                onChange={handleInputChange}
                placeholder="Nomor Telepon Wali"
                className="p-2 border rounded mt-2"
              />
              <button
                onClick={handleSaveProfile}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
              >
                Simpan Profil
              </button>
            </div>
          </section>
        )}

        {/* Class Management */}
        {!selectedStudent && !selectedClass && (
          <section>
            <h2 className="text-xl font-semibold">Pilih Tahun</h2>
            <div className="flex gap-4">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearSelect(year)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  {year}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              placeholder="Tambah Tahun"
              className="p-2 border rounded mt-4"
            />
            <button
              onClick={handleAddYear}
              className="p-2 bg-blue-500 text-white rounded mt-2"
            >
              Tambah Tahun
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
