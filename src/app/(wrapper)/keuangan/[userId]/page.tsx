"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import getKeuangan from "@/api/getApi/(wrapper)/getKeuangan";
import { NextPage } from "next";

interface Transaksi {
  id: number;
  lastTransDate: string;
  referensi: string;
  noJurnal: string;
  deskripsi: string;
  studentProfilId: number;
  debit: number;
  kredit: number;
  total: number;
}

const Keuangan: NextPage<{ params: { userId: string } }> = ({ params }) => {
  const queryClient = useQueryClient();

  const studentId = params.userId;
  console.log(studentId);

  // Fetch financial data
  const query = useQuery<Transaksi[]>({
    queryKey: ["keuangan", studentId],
    queryFn: async () => {
      try {
        return await getKeuangan(parseInt(studentId, 10));
      } catch {
        return []; // Jika gagal fetch, kembalikan array kosong
      }
    },
    initialData: [], // Tetapkan data awal sebagai array kosong
  });

  if (query.isLoading) {
    return <div>Still Loading . . .</div>;
  }

  // Data yang sudah di-*fetch*
  const data = Array.isArray(query.data) ? query.data : [];
  const totalOverall = data.reduce((acc, trx) => acc + trx.total, 0);

  return (
    <main className="flex flex-col min-h-screen bg-[#f5f5dc] bg-opacity-20">
      {/* Content Wrapper */}
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 ml-64 p-4">
          <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
            <h1 className="text-lg font-bold text-center">MODUL KEUANGAN</h1>
          </div>

          {/* Transaction Table */}
          <main className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Total Keseluruhan:{" "}
                <span className="text-green-600">
                  {totalOverall.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </h2>
            </div>
            <table className="w-full mt-5 bg-white border-collapse shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 border-b">Tanggal</th>
                  <th className="p-3 border-b">Referensi</th>
                  <th className="p-3 border-b">No Jurnal</th>
                  <th className="p-3 border-b">Deskripsi</th>
                  <th className="p-3 border-b">Debit (Rp)</th>
                  <th className="p-3 border-b">Kredit (Rp)</th>
                  <th className="p-3 border-b">Total (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((trx) => (
                    <tr key={trx.id} className="hover:bg-gray-100 text-center">
                      <td className="p-3 border-b">
                        {new Date(trx.lastTransDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td className="p-3 border-b">{trx.referensi}</td>
                      <td className="p-3 border-b">{trx.noJurnal}</td>
                      <td className="p-3 border-b">{trx.deskripsi}</td>
                      <td className="p-3 border-b">
                        {trx.debit.toLocaleString("id-ID")}
                      </td>
                      <td className="p-3 border-b">
                        {trx.kredit.toLocaleString("id-ID")}
                      </td>
                      <td className="p-3 border-b">
                        {trx.total.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-3 text-center text-gray-500">
                      Tidak ada transaksi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </main>
  );
};

export default Keuangan;
