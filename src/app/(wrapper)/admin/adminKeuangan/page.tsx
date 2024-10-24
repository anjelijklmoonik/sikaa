"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
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
  const [financeData, setFinanceData] = useState({
    date: "",
    reference: "",
    journalNumber: "",
    description: "",
    debit: "",
    credit: "",
    runningTotal: 0,
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "debit" || name === "credit") {
      const debit = parseFloat(financeData.debit) || 0;
      const credit = parseFloat(financeData.credit) || 0;
      setFinanceData((prevData) => ({
        ...prevData,
        runningTotal: debit - credit,
      }));
    }
  };

  const handleSaveFinance = () => {
    console.log("Finance Data Saved:", {
      student: selectedStudent,
      financeData,
    });
    alert("Data keuangan tersimpan!");
    router.push("/keuangan/1");
    setFinanceData({
      date: "",
      reference: "",
      journalNumber: "",
      description: "",
      debit: "",
      credit: "",
      runningTotal: 0,
    });
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
      {/* Sidebar */}
      <div className="sidebar fixed bg-[#fcce7e] w-auto h-full p-3 shadow-2xl">
        <ul className="flex flex-col gap-y-4">
          <li className="flex items-center">
            <HomeIcon className="h-6 w-6 text-black mr-2" />
            <Link href="/home" className="block p-2 rounded hover:bg-[#f9b75e]">
              Halaman Utama
            </Link>
          </li>
          <li className="flex items-center">
            <UserIcon className="h-6 w-6 text-black mr-2" />
            <Link
              href="/profil"
              className="block p-2 rounded hover:bg-[#f9b75e]"
            >
              Profil
            </Link>
          </li>
          <li className="flex items-center">
            <BanknotesIcon className="h-6 w-6 text-black mr-2" />
            <Link
              href="/keuangan"
              className="block p-2 rounded hover:bg-[#f9b75e]"
            >
              Keuangan
            </Link>
          </li>
          <li className="flex items-center">
            <ChartBarIcon className="h-6 w-6 text-black mr-2" />
            <Link
              href="/nilai"
              className="block p-2 rounded hover:bg-[#f9b75e]"
            >
              Nilai
            </Link>
          </li>
          <li className="flex items-center">
            <TrophyIcon className="h-6 w-6 text-black mr-2" />
            <Link
              href="/pencapaian"
              className="block p-2 rounded hover:bg-[#f9b75e]"
            >
              Pencapaian
            </Link>
          </li>
          <li className="flex items-center">
            <CalendarIcon className="h-6 w-6 text-black mr-2" />
            <Link
              href="/jadwal"
              className="block p-2 rounded hover:bg-[#f9b75e]"
            >
              Jadwal
            </Link>
          </li>
          <li className="flex items-center">
            <BookOpenIcon className="h-6 w-6 text-black mr-2" />
            <Link
              href="/materi"
              className="block p-2 rounded hover:bg-[#f9b75e]"
            >
              Materi
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveClass(cls);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tambah Kelas Baru"
                className="border rounded px-2 py-1 w-full mr-2"
              />
              <button
                onClick={handleAddClass}
                className="bg-[#f9b75e] text-white px-4 py-1 rounded"
              >
                Tambah
              </button>
            </div>
          </div>
        )}

        {selectedClass && !selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Daftar Siswa Kelas {selectedClass}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStudent(student);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tambah Siswa Baru"
                className="border rounded px-2 py-1 w-full mr-2"
              />
              <button
                onClick={handleAddStudent}
                className="bg-[#f9b75e] text-white px-4 py-1 rounded"
              >
                Tambah
              </button>
            </div>
          </div>
        )}

        {selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Form Keuangan Siswa: {selectedStudent}
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Tanggal</label>
                <input
                  type="date"
                  name="date"
                  value={financeData.date}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label>Referensi</label>
                <input
                  type="text"
                  name="reference"
                  value={financeData.reference}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label>Nomor Jurnal</label>
                <input
                  type="text"
                  name="journalNumber"
                  value={financeData.journalNumber}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label>Deskripsi</label>
                <input
                  type="text"
                  name="description"
                  value={financeData.description}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label>Debit</label>
                <input
                  type="number"
                  name="debit"
                  value={financeData.debit}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label>Kredit</label>
                <input
                  type="number"
                  name="credit"
                  value={financeData.credit}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label>Total Berjalan</label>
              <input
                type="number"
                value={financeData.runningTotal}
                readOnly
                className="border rounded px-2 py-1 w-full bg-gray-100"
              />
            </div>
            <button
              onClick={handleSaveFinance}
              className="bg-[#f9b75e] text-white px-4 py-2 rounded"
            >
              Simpan Keuangan
            </button>
          </div>
        )}

        {backNavigationStack.length > 0 && (
          <button
            onClick={handleBackNavigation}
            className="mt-4 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Kembali
          </button>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
