"use client";

import { useEffect, useState } from "react";
import { getNilaiParents } from "@/app/api/parents";

const NilaiParents = () => {
  const [loading, setLoading] = useState(true);
  const [nilaiStudent, setNilaiStudent] = useState<{ [mapel: string]: { skor: number } }>({});

  // 🔹 Fetch Data Nilai
  useEffect(() => {
    fetchNilai();
  }, []);

  const fetchNilai = async () => {
    try {
      console.log("📥 Fetching Nilai Student...");
      const response = await getNilaiParents();
      console.log("✅ Nilai Student Data:", response);

      if (response?.data) {
        setNilaiStudent(response.data);
      } else {
        console.warn("⚠️ Data nilai tidak ditemukan.");
      }
    } catch (error) {
      console.error("❌ Gagal mengambil data nilai:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Menghitung total skor dan rata-rata nilai
  const nilaiArray = Object.values(nilaiStudent).map((item) => item.skor);
  const totalNilai = nilaiArray.reduce((acc, skor) => acc + skor, 0);
  const rataRata = nilaiArray.length > 0 ? (totalNilai / nilaiArray.length).toFixed(2) : "0";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
        {/* Judul */}
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Nilai Siswa
        </h1>

        {/* Tabel Nilai */}
        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="text-left text-lg">
                  <th className="border border-gray-300 px-6 py-4">Mata Pelajaran</th>
                  <th className="border border-gray-300 px-6 py-4 text-center">Nilai</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(nilaiStudent).map(([mapel, { skor }]) => (
                  <tr key={mapel} className="hover:bg-gray-100 text-lg">
                    <td className="border border-gray-300 px-6 py-3">{mapel}</td>
                    <td className="border border-gray-300 px-6 py-3 text-center text-blue-600">
                      {skor}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Total rata-rata */}
              <tfoot className="bg-gray-100">
                <tr className="font-bold">
                  <td className="border border-gray-300 px-6 py-3 text-right">Rata-rata</td>
                  <td className="border border-gray-300 px-6 py-3 text-center text-green-600">
                    {rataRata}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NilaiParents;
