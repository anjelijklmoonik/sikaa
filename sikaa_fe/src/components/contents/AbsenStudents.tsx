  "use client";

  import { getAbsenStudents } from "@/app/api/students";
  import { useEffect, useState } from "react";


  const AbsenStudents = () => {
    const [loading, setLoading] = useState(true);
    const [absenData, setAbsenData] = useState<{ [key: string]: { [status: string]: number } }>({});

    // 🔹 Fetch Data Absensi
    useEffect(() => {
      fetchAbsensi();
    }, []);

    const fetchAbsensi = async () => {
      try {
        console.log("📥 Fetching Absensi Data...");
        const response = await getAbsenStudents();
        console.log("✅ Absensi Data:", response);

        if (response?.status && response.data) {
          setAbsenData(response.data);
        } else {
          console.warn("⚠️ Data absensi tidak ditemukan.");
        }
      } catch (error) {
        console.error("❌ Gagal mengambil data absensi:", error);
      } finally {
        setLoading(false);
      }
    };

    // 🔹 Menghitung total setiap kategori absensi
    const totalAbsensi: { [status: string]: number } = {};
    Object.values(absenData).forEach((mapel) => {
      Object.entries(mapel).forEach(([status, jumlah]) => {
        totalAbsensi[status] = (totalAbsensi[status] || 0) + jumlah;
      });
    });

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-300">
          {/* Judul */}
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Manajemen Absensi
          </h1>

          {/* Tabel Absensi */}
          {loading ? (
            <p className="text-center text-gray-500">Loading data...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr className="text-left text-lg">
                    <th className="border border-gray-300 px-6 py-4">Mata Pelajaran</th>
                    <th className="border border-gray-300 px-6 py-4 text-center">Hadir</th>
                    <th className="border border-gray-300 px-6 py-4 text-center">Izin</th>
                    <th className="border border-gray-300 px-6 py-4 text-center">Sakit</th>
                    <th className="border border-gray-300 px-6 py-4 text-center">Alfa</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(absenData).map(([mapel, stats]) => (
                    <tr key={mapel} className="hover:bg-gray-100 text-lg">
                      <td className="border border-gray-300 px-6 py-3">{mapel}</td>
                      <td className="border border-gray-300 px-6 py-3 text-center text-green-600">
                        {stats["Hadir"] || 0}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-center text-yellow-600">
                        {stats["Izin"] || 0}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-center text-blue-600">
                        {stats["Sakit"] || 0}
                      </td>
                      <td className="border border-gray-300 px-6 py-3 text-center text-red-600">
                        {stats["Alfa"] || stats["Alpa"] || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Total keseluruhan */}
                <tfoot className="bg-gray-100">
                  <tr className="font-bold">
                    <td className="border border-gray-300 px-6 py-3 text-right">Total</td>
                    <td className="border border-gray-300 px-6 py-3 text-center text-green-600">
                      {totalAbsensi["Hadir"] || 0}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-center text-yellow-600">
                      {totalAbsensi["Izin"] || 0}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-center text-blue-600">
                      {totalAbsensi["Sakit"] || 0}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-center text-red-600">
                      {totalAbsensi["Alfa"] || totalAbsensi["Alpa"] || 0}
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

  export default AbsenStudents;
