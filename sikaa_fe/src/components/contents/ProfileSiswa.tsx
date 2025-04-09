"use client";

import { useState } from "react";
import { getAllClasses, postClassMember, postStudentProfile } from "@/app/api/admin";
import { toast, Toaster } from "react-hot-toast";

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

const jurusanOptions = [
  { id: 2, name: "Layanan Kesehatan" },
  { id: 3, name: "Akuntasi Keuangan Lembaga" },
];

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
        jurusanId: profile.sekolah === "SMK" ? profile.jurusanId : 1, // default SMA jurusanId = 1
      };

      const savedStudent = await postStudentProfile(dataToSend);
      if (!savedStudent?.id) throw new Error("Student ID not returned");

      const classes = await getAllClasses();
      const targetClass = classes.find((cls: any) =>
        cls.noKelas === profile.kelas &&
        cls.jurusanId === dataToSend.jurusanId
      );

      console.log("🎯 Kelas Terpilih:", targetClass);

      if (!targetClass) throw new Error("Kelas tidak ditemukan");

      await postClassMember(targetClass.id, savedStudent.id);
      toast.success("Siswa berhasil disimpan dan ditambahkan ke kelas!");

      setTimeout(() => {
        setProfile(initialProfile);
      }, 500);

    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data siswa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Formulir Data Siswa</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nama" name="nama" value={profile.nama} onChange={handleChange} />
          <Input label="Nomor Induk Siswa (NIS)" name="noIndukSiswa" value={profile.noIndukSiswa} onChange={handleChange} />
          
          <Select label="Sekolah" name="sekolah" value={profile.sekolah} onChange={handleSekolahChange} options={["SMA", "SMK"]} />
          <Select label="Kelas" name="kelas" value={profile.kelas} onChange={handleChange} options={["X", "XI", "XII"]} />

          {profile.sekolah === "SMK" && (
            <div>
              <label className="font-semibold text-gray-700">Jurusan:</label>
              <select
                name="jurusanId"
                value={profile.jurusanId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                {jurusanOptions.map((j) => (
                  <option key={j.id} value={j.id}>{j.name}</option>
                ))}
              </select>
            </div>
          )}

          <Input label="Alamat" name="alamat" value={profile.alamat} onChange={handleChange} />
          <Input label="Tanggal Lahir" name="ttl" type="date" value={profile.ttl} onChange={handleChange} />
          <Select label="Jenis Kelamin" name="jenisKelamin" value={profile.jenisKelamin} onChange={handleChange} options={["Laki-laki", "Perempuan"]} />

          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
            >
              {loading ? "Menyimpan..." : "Simpan Data Siswa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Komponen kecil (optional modular)
const Input = ({ label, name, value, onChange, type = "text" }: any) => (
  <div>
    <label className="font-semibold text-gray-700">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 border rounded-md"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label className="font-semibold text-gray-700">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-md"
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
