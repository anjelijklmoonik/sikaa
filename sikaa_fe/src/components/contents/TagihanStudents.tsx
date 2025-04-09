"use client";

import { useState, useEffect } from "react";
import { getKeuanganStudents } from "@/app/api/students";
import { toast } from "react-hot-toast";

// 🔹 Tentukan tipe data untuk setiap entri keuangan
interface TagihanItem {
  tanggal: string;
  noreferensi: string;
  nojurnal: string;
  deskripsi: string;
  debit: number;
  kredit: number;
  runningTotal: number;
  formattedTanggal?: string; // Untuk menyimpan format tanggal yang sudah diubah
}

const TagihanStudents = () => {
  const [tagihan, setTagihan] = useState<TagihanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningTotal, setRunningTotal] = useState(0);

  useEffect(() => {
    fetchKeuangan();
  }, []);

  const fetchKeuangan = async () => {
    try {
      console.log("📥 Fetching Keuangan Data...");
      const response = await getKeuanganStudents();
      console.log("✅ Data Keuangan:", response);

      if (response?.data && Array.isArray(response.data)) {
        let total = 0;
        const formattedTagihan: TagihanItem[] = response.data.map((item: TagihanItem) => {
          total = item.runningTotal; // Running total dari API langsung
          return {
            ...item,
            formattedTanggal: new Date(item.tanggal).toLocaleDateString("id-ID"),
          };
        });

        setTagihan(formattedTagihan);
        setRunningTotal(total);
      } else {
        console.warn("⚠️ Data tagihan tidak ditemukan.");
      }
    } catch (error) {
      console.error("❌ Gagal mengambil data keuangan:", error);
      toast.error("Terjadi kesalahan saat mengambil data keuangan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 border border-gray-300">
        
        {/* Judul */}
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
          Tagihan Siswa
        </h1>

        {/* Tabel Tagihan */}
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Riwayat Tagihan</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="text-left text-lg">
                  <th className="border border-gray-300 px-4 py-3 text-center">Tanggal</th>
                  <th className="border border-gray-300 px-6 py-3 text-center">Referensi</th>
                  <th className="border border-gray-300 px-8 py-3 text-center">No Jurnal</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Deskripsi</th>
                  <th className="border border-gray-300 px-10 py-3 text-center">Debit (Rp)</th>
                  <th className="border border-gray-300 px-10 py-3 text-center">Kredit (Rp)</th>
                  <th className="border border-gray-300 px-10 py-3 text-center">Running Total</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.length > 0 ? (
                  tagihan.map((item: TagihanItem, index: number) => (
                    <tr key={index} className="hover:bg-gray-100 text-lg transition-all">
                      <td className="border border-gray-300 px-4 py-3 text-center">{item.formattedTanggal}</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">{item.noreferensi}</td>
                      <td className="border border-gray-300 px-4 py-3 text-center">{item.nojurnal}</td>
                      <td className="border border-gray-300 px-4 py-3 text-left">{item.deskripsi}</td>
                      <td className="border border-gray-300 px-4 py-3 text-right">
                        {item.debit > 0 ? `Rp ${item.debit.toLocaleString()}` : "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-right">
                        {item.kredit > 0 ? `Rp ${item.kredit.toLocaleString()}` : "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-right">
                        Rp {item.runningTotal.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      Tidak ada data tagihan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Total Akhir */}
        <div className="mt-8 text-right">
          <p className="text-lg font-semibold text-gray-700">
            <span className="text-black">Total Tagihan:</span>
            <span className="text-blue-500 font-bold"> Rp {runningTotal.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TagihanStudents;
