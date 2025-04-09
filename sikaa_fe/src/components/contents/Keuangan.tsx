"use client";

import { useState, useEffect } from "react";
import { getAllStudents, getKeuangan, postKeuangan } from "@/app/api/admin";
import { toast, Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

interface TransaksiKeuangan {
  id?: number;
  amount: number;
  referensi: string;
  noJurnal: string;
  type: string;
  deskripsi: string;
  transDate: string;
  keuanganId?: number; // Tambahkan di sini
}

interface Siswa {
  id: number;
  nama: string;
  Keuangan: {
    id: number;
  };
}

export default function Keuangan() {
  const [transaksi, setTransaksi] = useState<TransaksiKeuangan[]>([]);
  const [students, setStudents] = useState<Siswa[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [keuanganId, setKeuanganId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [newTransaksi, setNewTransaksi] = useState<TransaksiKeuangan>({
    amount: 0,
    referensi: "",
    noJurnal: "",
    type: "DEBIT",
    deskripsi: "",
    transDate: "",
    keuanganId: undefined,
  });

  useEffect(() => {
    fetchStudents(); // Fetch daftar siswa saat halaman dimuat
    fetchTransaksi(); // Fetch riwayat transaksi
  }, []);

  const fetchStudents = async () => {
    let allStudents: Siswa[] = []; // Initialize an empty array to store all students
    let currentPage = 1;
    const totalPages = 2; // Get this value dynamically from your API response, or set a default

    try {
      // Loop through all pages until we fetch all students
      while (currentPage <= totalPages) {
        const data = await getAllStudents(currentPage); // Fetch data for the current page
        if (Array.isArray(data?.data)) {
          allStudents = [...allStudents, ...data?.data]; // Append new students to the array
        }
        currentPage += 1; // Move to the next page
      }

      setStudents(allStudents); // Set all students to the state
    } catch (error) {
      console.error("❌ Gagal mengambil data siswa:", error);
      setStudents([]);
    }
  };

  // 🔹 Fetch Riwayat Transaksi Keuangan dari Backend
  const fetchTransaksi = async () => {
    try {
      const data = await getKeuangan();
      setTransaksi(data || []);
    } catch (error) {
      console.error("❌ Gagal mengambil data transaksi:", error);
    }
  };

  // 🔹 Handle Perubahan Input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTransaksi((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };
  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = e.target.value;

    if (!studentId) {
      setSelectedStudent(null);
      setKeuanganId(null);
      return;
    }

    const student = students.find((s) => s.id.toString() === studentId);

    console.log("📌 Student Selected:", student);
    console.log("📌 Keuangan ID:", student?.Keuangan?.id);

    if (student && student.Keuangan) {
      setSelectedStudent(studentId);
      setKeuanganId(student.Keuangan.id);
    } else {
      setKeuanganId(null);
      toast.error("Siswa ini belum memiliki data keuangan!");
    }
  };

  // 🔹 Kirim Data Keuangan ke Backend
  const submitTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !keuanganId) {
      toast.error("Harap pilih siswa yang memiliki data keuangan!");
      return;
    }

    if (
      !newTransaksi.deskripsi ||
      !newTransaksi.transDate ||
      newTransaksi.amount <= 0
    ) {
      toast.error("Harap isi semua data transaksi dengan benar!");
      return;
    }

    setLoading(true); // ✅ Mulai loading
    try {
      // 🕒 Konversi `transDate` ke format `YYYY-MM-DDTHH:mm:ss.SSSZ`
      const formattedDate = new Date(
        newTransaksi.transDate + "T11:00:00.000Z"
      ).toISOString();

      const transaksiData = {
        keuanganId,
        amount: newTransaksi.amount,
        referensi: newTransaksi.referensi || "-",
        noJurnal: newTransaksi.noJurnal || "-",
        type: newTransaksi.type,
        deskripsi: newTransaksi.deskripsi,
        transDate: formattedDate, // ✅ Gunakan format ISO
      };

      console.log("📤 Mengirim transaksi:", transaksiData);
      const response = await postKeuangan(transaksiData);
      console.log("✅ Transaksi Berhasil:", response);

      fetchTransaksi(); // 🔹 Perbarui daftar transaksi setelah submit

      // Reset Form
      setNewTransaksi({
        amount: 0,
        referensi: "",
        noJurnal: "",
        type: "DEBIT",
        deskripsi: "",
        transDate: "",
      });

      toast.success("Transaksi berhasil ditambahkan!");
    } catch (error) {
      console.error("❌ Gagal menambahkan transaksi:", error);
      toast.error("Terjadi kesalahan saat menambahkan transaksi.");
    } finally {
      setLoading(false); // ✅ Selesai loading
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Manajemen Keuangan
        </h1>
        <div>
          <label className="text-gray-700 font-semibold">Pilih Siswa:</label>
          <select
            name="studentId"
            onChange={handleStudentChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">-- Pilih Siswa --</option>
            {students.length > 0 ? (
              students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.nama}
                </option>
              ))
            ) : (
              <option disabled>Data siswa tidak tersedia</option>
            )}
          </select>
        </div>
        {/* Form Tambah Transaksi */}
        <form
          onSubmit={submitTransaction}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div>
            <label className="text-gray-700 font-semibold">Tanggal:</label>
            <input
              type="date"
              name="transDate"
              value={newTransaksi.transDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Deskripsi:</label>
            <textarea
              name="deskripsi"
              value={newTransaksi.deskripsi}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Jumlah (Rp):</label>
            <input
              type="number"
              name="amount"
              value={newTransaksi.amount || ""}
              onChange={handleChange}
              min="1" // Mencegah nilai 0 atau negatif
              className="w-full p-2 border rounded-md"
              placeholder="Masukkan jumlah"
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault(); // Mencegah input angka negatif dan huruf eksponensial
                }
              }}
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Tipe:</label>
            <select
              name="type"
              value={newTransaksi.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="DEBIT">DEBIT</option>
              <option value="KREDIT">KREDIT</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Referensi:</label>
            <input
              type="text"
              name="referensi"
              value={newTransaksi.referensi}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">No Jurnal:</label>
            <input
              type="text"
              name="noJurnal"
              value={newTransaksi.noJurnal}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-center md:col-span-2">
            <button
              type="submit"
              className={`bg-yellow-500 text-white px-4 py-2 rounded-lg font
    hover:bg-yellow-600 transition flex items-center justify-center gap-2 ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
              disabled={loading} // ✅ Mencegah klik saat loading
            >
              {loading ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Tambah Transaksi"
              )}
            </button>
          </div>
        </form>

        {/* Tabel Keuangan */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Riwayat Transaksi
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Tanggal</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
                <th className="border border-gray-300 px-4 py-2">Tipe</th>
                <th className="border border-gray-300 px-4 py-2">
                  Jumlah (Rp)
                </th>
                <th className="border border-gray-300 px-4 py-2">Referensi</th>
                <th className="border border-gray-300 px-4 py-2">No Jurnal</th>
              </tr>
            </thead>
            <tbody>
              {transaksi.map((item) => (
                <tr
                  key={item.id}
                  className="text-center border border-gray-300"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.transDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.deskripsi}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      item.type === "DEBIT" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.type}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    Rp {item.amount.toLocaleString("id-ID")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.referensi || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.noJurnal || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
