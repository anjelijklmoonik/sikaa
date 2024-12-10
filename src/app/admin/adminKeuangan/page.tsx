// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const AdminDashboard = () => {
//   const [userId, setUserId] = useState(null);
//   const router = useRouter();

//   // State variables
//   const [selectedClassType, setSelectedClassType] = useState<string | null>(
//     null
//   );
//   const [studentProfilId, setStudentProfilId] = useState<number | null>(null);
//   const [classes, setClasses] = useState<string[]>([]);
//   const [newClass, setNewClass] = useState("");
//   const [selectedClass, setSelectedClass] = useState<string | null>(null);
//   const [students, setStudents] = useState<string[]>([]);
//   const [newStudent, setNewStudent] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
//   const [financeData, setFinanceData] = useState<{
//     date: string;
//     reference: string;
//     journalNumber: string;
//     description: string;
//     debit: string;
//     credit: string;
//     runningTotal: number;
//   }>({
//     date: "",
//     reference: "",
//     journalNumber: "",
//     description: "",
//     debit: "",
//     credit: "",
//     runningTotal: 0,
//   });
//   const [backNavigationStack, setBackNavigationStack] = useState<string[]>([]);

//   // Load classes and students from localStorage based on selected class type
//   useEffect(() => {
//     if (selectedClassType) {
//       const storedClasses = JSON.parse(
//         localStorage.getItem(`${selectedClassType}_classes`) || "[]"
//       );
//       const storedStudents = JSON.parse(
//         localStorage.getItem(`${selectedClassType}_students`) || "[]"
//       );
//       setClasses(storedClasses);
//       setStudents(storedStudents);
//     }
//   }, [selectedClassType]);

//   // Save classes and students to localStorage when they change
//   useEffect(() => {
//     if (selectedClassType) {
//       localStorage.setItem(
//         `${selectedClassType}_classes`,
//         JSON.stringify(classes)
//       );
//       localStorage.setItem(
//         `${selectedClassType}_students`,
//         JSON.stringify(students)
//       );
//     }
//   }, [classes, students, selectedClassType]);

//   // Handlers
//   const handleClassSelect = (classType: string) => {
//     setSelectedClassType(classType);
//     setSelectedClass(null);
//     setStudents([]);
//     setBackNavigationStack(["classType"]); // Push class type to back stack
//   };

//   const handleAddClass = () => {
//     const trimmedClass = newClass.trim();
//     if (trimmedClass && !classes.includes(trimmedClass)) {
//       setClasses((prevClasses) => {
//         const updatedClasses = [...prevClasses, trimmedClass];
//         return updatedClasses.sort((a, b) => a.localeCompare(b));
//       });
//       setNewClass("");
//     }
//   };

//   const handleRemoveClass = (classToRemove: string) => {
//     setClasses(classes.filter((cls) => cls !== classToRemove));
//   };

//   const handleSelectClass = (className: string) => {
//     setSelectedClass(className);
//     setBackNavigationStack((prev) => [...prev, "classes"]);
//   };

//   const handleAddStudent = () => {
//     const trimmedStudent = newStudent.trim();
//     if (trimmedStudent && !students.includes(trimmedStudent)) {
//       setStudents((prevStudents) => {
//         const updatedStudents = [...prevStudents, trimmedStudent];
//         return updatedStudents.sort((a, b) => a.localeCompare(b));
//       });
//       setNewStudent("");
//     }
//   };

//   const handleRemoveStudent = (studentToRemove: string) => {
//     setStudents(students.filter((student) => student !== studentToRemove));
//   };

//   const handleSelectStudent = (student: string) => {
//     setSelectedStudent(student);
//     setBackNavigationStack((prev) => [...prev, "students"]);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFinanceData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     if (name === "debit" || name === "credit") {
//       const debit = parseFloat(financeData.debit) || 0;
//       const credit = parseFloat(financeData.credit) || 0;
//       setFinanceData((prevData) => ({
//         ...prevData,
//         runningTotal: debit - credit,
//       }));
//     }
//   };

//   const handleSaveFinance = () => {
//     console.log("Finance Data Saved:", {
//       student: selectedStudent,
//       financeData,
//     });
//     alert("Data keuangan tersimpan!");
//     router.push(`/keuangan/${studentProfilId}`); // Navigate to the finance page
//     setFinanceData({
//       date: "",
//       reference: "",
//       journalNumber: "",
//       description: "",
//       debit: "",
//       credit: "",
//       runningTotal: 0,
//     });
//     setSelectedStudent(null);
//   };

//   const handleBackNavigation = () => {
//     const lastPage = backNavigationStack.pop();
//     if (lastPage === "students") {
//       setSelectedStudent(null);
//     } else if (lastPage === "classes") {
//       setSelectedClass(null);
//     } else if (lastPage === "classType") {
//       setSelectedClassType(null);
//       setClasses([]); // Reset classes when navigating back to class type selection
//       setStudents([]); // Reset students as well
//     }
//     setBackNavigationStack([...backNavigationStack]);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       if (selectedClass) {
//         handleAddStudent();
//       } else {
//         handleAddClass();
//       }
//     }
//   };

//   return (
//     <main className="flex flex-row min-h-screen bg-[#f5f5dc] bg-opacity-20">
//       {/* Main Content */}
//       <div className="ml-64 p-8 w-full">
//         <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

//         {/* Class Type Selection */}
//         {!selectedClassType && (
//           <div className="flex flex-col mb-4">
//             <h2 className="text-2xl font-bold mb-4">Pilih Tipe Kelas</h2>
//             <button
//               onClick={() => handleClassSelect("SMA")}
//               className="bg-[#f9b75e] text-white px-4 py-2 rounded mb-2"
//             >
//               SMA
//             </button>
//             <button
//               onClick={() => handleClassSelect("SMK")}
//               className="bg-[#f9b75e] text-white px-4 py-2 rounded"
//             >
//               SMK
//             </button>
//           </div>
//         )}

//         {/* Class Management */}
//         {selectedClassType && !selectedClass && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">
//               Daftar Kelas ({selectedClassType})
//             </h2>
//             <div className="flex flex-col mb-4">
//               {classes.map((cls) => (
//                 <div
//                   key={cls}
//                   className="flex items-center justify-between border-b py-2"
//                   onClick={() => handleSelectClass(cls)}
//                 >
//                   <span>{cls}</span>
//                   <button
//                     className="text-red-500"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveClass(cls);
//                     }}
//                   >
//                     Hapus
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <input
//               type="text"
//               value={newClass}
//               onChange={(e) => setNewClass(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Tambahkan Kelas"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <button
//               className="bg-[#f9b75e] text-white px-4 py-2 rounded"
//               onClick={handleAddClass}
//             >
//               Tambahkan Kelas
//             </button>
//           </div>
//         )}

//         {/* Student Management */}
//         {selectedClass && !selectedStudent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">
//               Daftar Siswa ({selectedClass})
//             </h2>
//             <div className="flex flex-col mb-4">
//               {students.map((student) => (
//                 <div
//                   key={student}
//                   className="flex items-center justify-between border-b py-2"
//                   onClick={() => handleSelectStudent(student)}
//                 >
//                   <span>{student}</span>
//                   <button
//                     className="text-red-500"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemoveStudent(student);
//                     }}
//                   >
//                     Hapus
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <input
//               type="text"
//               value={newStudent}
//               onChange={(e) => setNewStudent(e.target.value)}
//               onKeyDown={handleKeyPress}
//               placeholder="Tambahkan Siswa"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <button
//               className="bg-[#f9b75e] text-white px-4 py-2 rounded"
//               onClick={handleAddStudent}
//             >
//               Tambahkan Siswa
//             </button>
//           </div>
//         )}

//         {/* Finance Entry Form */}
//         {selectedStudent && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">
//               Entri Keuangan untuk {selectedStudent}
//             </h2>
//             <input
//               type="date"
//               name="date"
//               value={financeData.date}
//               onChange={handleInputChange}
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="reference"
//               value={financeData.reference}
//               onChange={handleInputChange}
//               placeholder="Referensi"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="journalNumber"
//               value={financeData.journalNumber}
//               onChange={handleInputChange}
//               placeholder="Nomor Jurnal"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <input
//               type="text"
//               name="description"
//               value={financeData.description}
//               onChange={handleInputChange}
//               placeholder="Deskripsi"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <input
//               type="number"
//               name="debit"
//               value={financeData.debit}
//               onChange={handleInputChange}
//               placeholder="Debit"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <input
//               type="number"
//               name="credit"
//               value={financeData.credit}
//               onChange={handleInputChange}
//               placeholder="Kredit"
//               className="border rounded px-2 py-1 mb-2 w-full"
//             />
//             <div className="border rounded px-2 py-1 mb-2 w-full">
//               Total Berjalan: {financeData.runningTotal}
//             </div>
//             <button
//               className="bg-[#f9b75e] text-white px-4 py-2 rounded"
//               onClick={handleSaveFinance}
//             >
//               Simpan Entri
//             </button>
//           </div>
//         )}

//         {/* Back Navigation Button */}
//         {backNavigationStack.length > 0 && (
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded fixed bottom-8 left-8"
//             onClick={handleBackNavigation}
//           >
//             Kembali
//           </button>
//         )}
//       </div>
//     </main>
//   );
// };

// export default AdminDashboard;

"use client";

import { useState } from "react";
import postTransaksi from "@/api/postApi/(wrapper)/postTransaksi";

const TransaksiForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("DEBIT");
  const [transDate, setTransDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [keuanganId, setKeuanganId] = useState<number>(1); // ID keuangan (contoh statis)
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      amount, // Jumlah transaksi
      type, // Tipe transaksi: 'DEBIT' atau 'KREDIT'
      transDate, // Tanggal transaksi
      keuanganId, // ID keuangan terkait
    };

    try {
      const response = await postTransaksi(keuanganId, payload);
      setStatusMessage("Transaksi berhasil dibuat!");
      console.log("Respons API:", response);
    } catch (error: any) {
      setStatusMessage(`Gagal membuat transaksi: ${error.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow-md ml-64"
    >
      <h2 className="text-lg font-bold mb-4">Tambah Transaksi</h2>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium">
          Jumlah Transaksi (Rp)
        </label>
        <input
          id="amount"
          type="number"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium">
          Tipe Transaksi
        </label>
        <select
          id="type"
          className="w-full p-2 border rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="DEBIT">DEBIT</option>
          <option value="KREDIT">KREDIT</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="transDate" className="block text-sm font-medium">
          Tanggal Transaksi
        </label>
        <input
          id="transDate"
          type="date"
          className="w-full p-2 border rounded"
          value={transDate}
          onChange={(e) => setTransDate(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Tambah Transaksi
      </button>

      {statusMessage && <p className="mt-4 text-sm">{statusMessage}</p>}
    </form>
  );
};

export default TransaksiForm;
