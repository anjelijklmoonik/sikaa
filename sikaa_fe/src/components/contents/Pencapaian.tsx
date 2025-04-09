"use client";

import { useState, useEffect } from "react";
import {
  getAchievements,
  postAchivement,
  getAllStudents,
} from "@/app/api/admin";
import { toast, Toaster } from "react-hot-toast";

interface Pencapaian {
  id?: number;
  studentProfilId: number;
  judul: string;
  tanggal: string;
  deskripsi: string;
  namaSiswa?: string;
}

interface Siswa {
  id: number;
  nama: string;
}

export default function PencapaianSiswa() {
  const [pencapaianList, setPencapaianList] = useState<Pencapaian[]>([]);
  const [students, setStudents] = useState<Siswa[]>([]);
  const [form, setForm] = useState<Omit<Pencapaian, "id" | "namaSiswa">>({
    studentProfilId: 0,
    judul: "",
    tanggal: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAchievements();
    fetchStudents();
  }, []);

  // 🔹 Ambil data pencapaian dari API
  const fetchAchievements = async () => {
    const data = await getAchievements();
    console.log("📥 Data Pencapaian dari API:", data);
    setPencapaianList(data || []);
  };

  // 🔹 Ambil daftar siswa dari API
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

  // 🔹 Handle perubahan input form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "studentProfilId" ? Number(value) : value,
    }));
  };

  // 🔹 Kirim pencapaian ke backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.studentProfilId ||
      !form.judul ||
      !form.tanggal ||
      !form.deskripsi
    ) {
      toast.error("❌ Mohon isi semua kolom!");
      return;
    }

    setLoading(true);
    try {
      // 🕒 Format tanggal sesuai `YYYY-MM-DDTHH:mm:ss.SSSZ`
      const formattedDate = new Date(
        form.tanggal + "T13:00:00.000Z"
      ).toISOString();

      const dataToSend = {
        ...form,
        tanggal: formattedDate,
      };

      console.log("📤 Mengirim Data:", dataToSend); // ✅ Log data sebelum submit

      const response = await postAchivement(dataToSend);

      console.log("✅ Pencapaian berhasil ditambahkan:", response); // ✅ Log response dari API
      toast.success("✅ Pencapaian berhasil ditambahkan!");
      fetchAchievements(); // 🔹 Update daftar pencapaian

      // Reset form
      setForm({
        studentProfilId: 0,
        judul: "",
        tanggal: "",
        deskripsi: "",
      });
    } catch (error) {
      console.error("❌ Gagal menambahkan pencapaian:", error);
      toast.error("❌ Terjadi kesalahan saat menambahkan pencapaian.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pencapaian Siswa
        </h1>

        {/* Form Tambah Pencapaian */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Tambah Pencapaian
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="text-gray-700 font-semibold">
                Pilih Siswa:
              </label>
              <select
                name="studentProfilId"
                value={form.studentProfilId}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">-- Pilih Siswa --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-semibold">
                Judul Pencapaian:
              </label>
              <input
                type="text"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-gray-700 font-semibold">Tanggal:</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Deskripsi:</label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
                rows={3}
              ></textarea>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
              >
                {loading ? "Menyimpan..." : "Tambah Pencapaian"}
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Pencapaian */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Daftar Pencapaian:
          </h2>
          <table className="w-full bg-gray-50 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nama</th>
                <th className="p-2">Judul</th>
                <th className="p-2">Tanggal</th>
                <th className="p-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {pencapaianList.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">
                    {students.find((s) => s.id === p.studentProfilId)?.nama ||
                      "Tidak Diketahui"}
                  </td>
                  <td className="p-2">{p.judul}</td>
                  <td className="p-2">
                    {new Date(p.tanggal).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-2">{p.deskripsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
