"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getParentAchievements } from "@/app/api/parents";

export default function PencapaianOrtu() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data pencapaian siswa
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await getParentAchievements();
      console.log("✅ Pencapaian Siswa:", response);

      // Cek apakah response memiliki struktur yang sesuai
      if (response?.data && Array.isArray(response.data)) {
        setAchievements(response.data);
        toast.success("Data pencapaian berhasil dimuat.");
      } else {
        toast.error("Format data tidak valid.");
        setAchievements([]);
      }
    } catch (error) {
      toast.error("Gagal mengambil data pencapaian.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Pencapaian Siswa</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : achievements.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada pencapaian ditemukan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="text-left text-lg">
                  <th className="border border-gray-300 px-6 py-4">No</th>
                  <th className="border border-gray-300 px-6 py-4">Judul</th>
                  <th className="border border-gray-300 px-6 py-4">Deskripsi</th>
                  <th className="border border-gray-300 px-6 py-4">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((achievement, index) => (
                  <tr key={achievement.id} className="hover:bg-gray-100 text-lg">
                    <td className="border border-gray-300 px-6 py-3">{index + 1}</td>
                    <td className="border border-gray-300 px-6 py-3">{achievement.judul}</td>
                    <td className="border border-gray-300 px-6 py-3">{achievement.deskripsi}</td>
                    <td className="border border-gray-300 px-6 py-3">
                      {new Date(achievement.tanggal).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
