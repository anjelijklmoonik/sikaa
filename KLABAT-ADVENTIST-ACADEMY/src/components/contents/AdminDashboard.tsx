"use client";
import { getAllStudentsCount } from "@/app/api/admin";
import { useState, useEffect } from "react";
import { FaSchool } from "react-icons/fa";
export default function AdminDashboard() {
  const [totalSMA, setTotalSMA] = useState(0);
  const [totalSMK, setTotalSMK] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data siswa saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStudentsCount();
        console.log(data);
        setTotalSMA(data.SMA);
        setTotalSMK(data.SMK);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  

  // Aturan Sekolah
  const schoolRules = [
    "Be On Time",
    "Keep the Surrounding Clean and Neat",
    "Be Free From Gadget",
    "Eat Properly",
    "Be Free From Cigarettes, Alcohol, Drugs, and Other Destructive Things",
    "Be Good to Friends",
    "Do The Best In Everything",
    "Love and Care The Surrounding",
    "Wear Proper Uniform",
    "Be Responsible For Your Own Learning",
  ];

  // Data Keuangan
  const financeData = [
    { keterangan: "Uang Pembangunan", biaya: "Rp. 167.000 / Rp. 1.000.000" },
    { keterangan: "Pendaftaran", biaya: "Rp. 150.000" },
    { keterangan: "Uang Lab", biaya: "Rp. 150.000 / semester" },
    { keterangan: "Uang Sekolah", biaya: "Rp. 400.000 / Rp. 2.400.000" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition">
          <FaSchool className="text-yellow-500 text-4xl" />
            <div>
              <p className="text-gray-600">Total Siswa SMA</p>
              <h2 className="text-2xl font-bold">{loading ? "Loading..." : totalSMA}</h2>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-4 hover:shadow-xl transition">
            <FaSchool className="text-blue-500 text-4xl" />
            <div>
              <p className="text-gray-600">Total Siswa SMK</p>
              <h2 className="text-2xl font-bold">{loading ? "Loading..." : totalSMK}</h2>
            </div>
          </div>
        </div>

        {/* ATURAN SEKOLAH */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
            📜 Aturan Sekolah
          </h2>
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {schoolRules.map((rule, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100 transition">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}.</td>
                  <td className="border border-gray-300 px-4 py-2">{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* KEUANGAN */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
            💰 Keuangan
          </h2>
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Keterangan</th>
                <th className="border border-gray-300 px-4 py-2">Biaya (BLN / SEM)</th>
              </tr>
            </thead>
            <tbody>
              {financeData.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-100 transition">
                  <td className="border border-gray-300 px-4 py-2">{item.keterangan}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.biaya}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100">
              <tr>
                <td className="font-bold border border-gray-300 px-4 py-2">TOTAL</td>
                <td className="font-bold border border-gray-300 px-4 py-2">
                  Rp. 567.000 / Rp. 3.400.000
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* BERKAS ADMINISTRASI */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="font-semibold text-lg text-gray-800 mb-4 flex items-center">
            📂 Berkas Administrasi
          </h2>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Siswa Baru</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Fotocopy Ijazah SMP</li>
              <li>Fotocopy Akte Kelahiran</li>
              <li>Fotocopy Kartu Keluarga</li>
              <li>Pas Foto 3x4</li>
            </ul>
            <h3 className="text-lg font-semibold mt-4 mb-2">Siswa Pindahan</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Surat pindah dari sekolah asal</li>
              <li>Fotocopy raport kelas sebelumnya</li>
              <li>Fotocopy Ijazah SMP</li>
              <li>Fotocopy Akte Kelahiran</li>
              <li>Fotocopy Kartu Keluarga</li>
              <li>Pas Foto 3x4</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
