"use client";

import { useState } from "react";
import { postStudentProfile } from "@/app/api/admin";
import { toast, Toaster } from "react-hot-toast";
import { clear } from "console";
interface SiswaProfile {
    nama: string;
    noIndukSiswa: string;
    sekolah: "SMA" | "SMK";
    kelas: "X" | "XI" | "XII";
    jurusanId?: number;
    alamat: string;
    ttl: string;
    jenisKelamin: "Laki-laki" | "Perempuan";
  }
  const initialProfile: SiswaProfile = {
    nama: "",
    noIndukSiswa: "",
    sekolah: "SMA",
    kelas: "X",
    jurusanId: undefined,
    alamat: "",
    ttl: "",
    jenisKelamin: "Laki-laki",
  };
const jurusanOptions = [
  { id: 1, name: "Keperawatan" },
  { id: 2, name: "Akuntansi" },
];

export default function ProfileSiswaForm() {
    const [profile, setProfile] = useState<SiswaProfile>(initialProfile);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "jurusanId" ? Number(value) : value,
    }));
  };

  const handleSekolahChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "SMA" | "SMK";
    setProfile((prev) => ({
      ...prev,
      sekolah: value,
      jurusanId: value === "SMK" ? jurusanOptions[0].id : undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...profile,
        jurusanId: profile.sekolah === "SMK" ? profile.jurusanId : undefined, // Hanya kirim jurusanId jika SMK
      };

      console.log("📤 Mengirim Data Siswa:", dataToSend);
      await postStudentProfile(dataToSend);
      toast.success("Data siswa berhasil disimpan!");
      setProfile(initialProfile);
    } catch (error) {
      console.error("❌ Gagal menyimpan data siswa:", error);
      toast.error("Terjadi kesalahan saat menyimpan data siswa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Formulir Data Siswa</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-semibold">Nama:</label>
            <input
              type="text"
              name="nama"
              value={profile.nama}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Nomor Induk Siswa (NIS):</label>
            <input
              type="text"
              name="noIndukSiswa"
              value={profile.noIndukSiswa}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Sekolah:</label>
            <select
              name="sekolah"
              value={profile.sekolah}
              onChange={handleSekolahChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="SMA">SMA</option>
              <option value="SMK">SMK</option>
            </select>
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Kelas:</label>
            <select
              name="kelas"
              value={profile.kelas}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
            </select>
          </div>

          {profile.sekolah === "SMK" && (
            <div>
              <label className="text-gray-700 font-semibold">Jurusan:</label>
              <select
                name="jurusanId"
                value={profile.jurusanId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                {jurusanOptions.map((jurusan) => (
                  <option key={jurusan.id} value={jurusan.id}>
                    {jurusan.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-gray-700 font-semibold">Alamat:</label>
            <input
              type="text"
              name="alamat"
              value={profile.alamat}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Tempat & Tanggal Lahir:</label>
            <input
              type="date"
              name="ttl"
              value={profile.ttl}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Jenis Kelamin:</label>
            <select
              name="jenisKelamin"
              value={profile.jenisKelamin}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
            >
              {loading ? "Menyimpan..." : "Simpan Data Siswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
