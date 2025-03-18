"use client";
import { useState, useEffect } from "react";
import { getCurrentUser } from "@/app/api/admin";
import { toast, Toaster } from "react-hot-toast";
import { upadateProfil } from "@/app/api/students";
interface ProfileDataType {
  nama: string;
  nis: string;
  sekolah: string;
  kelas: string;
  jurusan: string;
  tanggalLahir: string;
  alamat: string;
  agama: string;
  jenisKelamin: string;
  noTelp: string;
  email: string;
  namaAyah: string;
  namaIbu: string;
  noTelpAyah: string;
  noTelpIbu: string;
  namaWali: string;
  noTelpWali: string;
  foto: string;
  [key: string]: string; // 🔹 Tambahkan index signature
}
const ProfileStudents = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileDataType>({
    nama: "",
    nis: "",
    sekolah: "",
    kelas: "",
    jurusan: "",
    tanggalLahir: "",
    alamat: "",
    agama: "",
    jenisKelamin: "",
    noTelp: "",
    email: "",
    namaAyah: "",
    namaIbu: "",
    noTelpAyah: "",
    noTelpIbu: "",
    namaWali: "",
    noTelpWali: "",
    foto: "",
  });
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      console.log("📥 Fetching Current User...");
      const user = await getCurrentUser();
      console.log("✅ User Data:", user);

      if (user?.data?.studentProfil) {
        const student = user.data.studentProfil;

        setProfileData({
          nama: student.nama || "-",
          nis: student.noIndukSiswa || "-",
          sekolah: student.sekolah || "-",
          kelas: student.kelas || "-",
          jurusan: student.jurusanId ? `Jurusan ID: ${student.jurusanId}` : "-",
          tanggalLahir: student.ttl || "-",
          alamat: student.alamat || "-",
          agama: student.agama || "",
          jenisKelamin: student.jenisKelamin || "-",
          noTelp: student.noTelp || "",
          email: student.email || "",
          namaAyah: student.namaAyah || "",
          namaIbu: student.namaIbu || "",
          noTelpAyah: student.noTelpAyah || "",
          noTelpIbu: student.noTelpIbu || "",
          namaWali: student.namaWali || "",
          noTelpWali: student.noTelpWali || "",
          foto: student.foto || "/foto.png",
        });
      } else {
        console.warn("⚠️ Data siswa tidak ditemukan.");
      }
    } catch (error) {
      console.error("❌ Gagal mengambil data user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Pastikan field hanya diubah jika termasuk dalam tipe yang bisa diedit
    if (name in profileData) {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        noTelp: profileData.noTelp || null,
        email: profileData.email || null,
        namaAyah: profileData.namaAyah || null,
        namaIbu: profileData.namaIbu || null,
        noTelpAyah: profileData.noTelpAyah || null,
        noTelpIbu: profileData.noTelpIbu || null,
        namaWali: profileData.namaWali || null,
        noTelpWali: profileData.noTelpWali || null,
      };

      console.log("📤 Mengirim data update:", updateData);
      await upadateProfil(updateData);
      toast.success("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("❌ Gagal memperbarui profil:", error);
      toast.error("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Bagian Header */}
        <div className="bg-yellowD-600 p-6">
          <h1 className="text-2xl font-bold text-black">Data Profil Siswa</h1>
        </div>

        {/* Data Profil Siswa */}
        <div className="p-8">
          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : (
            <form>
              <div className="space-y-4">
                {/* Nama (Tidak Bisa Diubah) */}
                <div className="flex flex-col">
                  <label className="font-semibold">Full Name *</label>
                  <input type="text" name="nama" value={profileData.nama} className="p-2 border rounded-md" readOnly />
                </div>

                {/* Nomor Induk Siswa (Tidak Bisa Diubah) */}
                <div className="flex flex-col">
                  <label className="font-semibold">Student ID *</label>
                  <input type="text" name="nis" value={profileData.nis} className="p-2 border rounded-md" readOnly />
                </div>

                {/* Sekolah, Kelas, Jurusan (Tidak Bisa Diubah) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-semibold">School *</label>
                    <input type="text" name="sekolah" value={profileData.sekolah} className="p-2 border rounded-md" readOnly />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Class *</label>
                    <input type="text" name="kelas" value={profileData.kelas} className="p-2 border rounded-md" readOnly />
                  </div>
                </div>

                {/* Field yang Bisa Diedit */}
                {["noTelp", "email", "namaAyah", "namaIbu", "noTelpAyah", "noTelpIbu", "namaWali", "noTelpWali"].map(
                  (field) => (
                    <div key={field} className="flex flex-col">
                      <label className="font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
                      <input
                        type="text"
                        name={field}
                        value={profileData[field]}
                        onChange={handleChange}
                        className="p-2 border rounded-md"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Button Simpan Perubahan */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md"
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileStudents;
