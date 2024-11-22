"use client"; // Add this directive at the top of the file

import { useQuery, useQueryClient } from "@tanstack/react-query";
import getKeuangan from "@/api/getApi/(wrapper)/getKeuangan";

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

const Keuangan: React.FC = ({ params }) => {
  const queryClient = useQueryClient;

  const studentId = params.userId;
  console.log(params.userId);
  const query = useQuery<Transaksi[]>({
    queryKey: ["keuangan", studentId],
    queryFn: () => getKeuangan(studentId),
  });
  console.log(query.data);

  if (query.isLoading) {
    return <div>Still Loading . . .</div>;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  const data = query.data || [];

  const totalOverall = Array.isArray(data)
    ? data.reduce((acc, trx) => acc + trx.total, 0)
    : 0;

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
            <h2>Total Keseluruhan: {totalOverall.toLocaleString("id-ID")}</h2>
            <table className="w-full mt-5 bg-white border-collapse">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Referensi</th>
                  <th>No Jurnal</th>
                  <th>Deskripsi</th>
                  <th>Debit (Rp)</th>
                  <th>Kredit (Rp)</th>
                  <th>Total (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((trx) => (
                    <tr key={trx.id}>
                      <td>
                        {new Date(trx.lastTransDate).toLocaleDateString(
                          "id-ID"
                        )}
                      </td>
                      <td>{trx.referensi}</td>
                      <td>{trx.noJurnal}</td>
                      <td>{trx.deskripsi}</td>
                      <td>{trx.debit.toLocaleString("id-ID")}</td>
                      <td>{trx.kredit.toLocaleString("id-ID")}</td>
                      <td>{trx.total.toLocaleString("id-ID")}</td>{" "}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>Tidak ada transaksi</td>
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
