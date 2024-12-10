"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getNilai from "@/api/getApi/(wrapper)/getNilai";

type MataPelajaranType = {
  mataPelajaran: string;
  nilai: number;
};

const Nilai = ({ params }) => {
  // Validasi params.userId untuk mencegah error saat parameter kosong
  if (!params?.userId) {
    return <div>User ID tidak valid</div>;
  }

  // Query untuk mendapatkan data nilai
  const query = useQuery({
    queryKey: ["nilai", params.userId],
    queryFn: () => getNilai(params.userId), // Mendapatkan data nilai berdasarkan userId
  });

  // State untuk menangani ekspansi semester (hanya satu semester)
  const [expanded, setExpanded] = useState(false);

  // Default data sementara jika data dari query belum tersedia
  const defaultMataPelajaranData: MataPelajaranType[] = [
    { mataPelajaran: "Matematika", nilai: 85 },
    { mataPelajaran: "Bahasa Indonesia", nilai: 90 },
    { mataPelajaran: "Fisika", nilai: 78 },
  ];

  // Data mata pelajaran dari API atau default
  const mataPelajaranData: MataPelajaranType[] =
    query.data?.mataPelajaran || defaultMataPelajaranData;

  const toggleExpand = () => {
    setExpanded((prev) => !prev); // Toggle antara expanded dan tidak expanded
  };

  // Loading state
  if (query.isLoading) {
    return <div>This Page is still Loading . . .</div>;
  }

  // Error state
  if (query.isError) {
    return <div>{query.error?.message || "Terdapat error"}</div>;
  }

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      <div className="flex flex-1">
        <div className="flex-1 ml-64 p-4">
          <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
            <h1 className="text-lg font-bold text-center">NILAI</h1>
          </div>

          <div className="mt-5">
            {/* Menampilkan hanya satu semester dengan expand */}
            <div className="mb-4">
              <div
                className="cursor-pointer text-center bg-[#fcce7e] p-3 rounded-lg shadow-md"
                onClick={toggleExpand} // Klik untuk toggle expand
              >
                Semester 1
              </div>
              {expanded && ( // Menampilkan detail mata pelajaran hanya jika expanded
                <div className="p-4 bg-gray-100 rounded-b-lg shadow-md">
                  {mataPelajaranData.length > 0 ? (
                    <ul>
                      {mataPelajaranData.map((mapel, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{mapel.mataPelajaran}</span>
                          <span>{mapel.nilai}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">
                      Belum ada data mata pelajaran.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nilai;
