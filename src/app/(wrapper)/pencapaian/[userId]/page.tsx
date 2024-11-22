"use client";

import { NextPage } from "next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getPencapaian from "@/api/getApi/(wrapper)/getPencapaian";
import React from "react";

interface Capaian {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: Date;
  studentProfilId: number;
}

const Pencapaian: NextPage = ({ params }) => {
  const queryClient = useQueryClient;

  const studentId = params.userId;
  console.log(params.userId);
  const query = useQuery<Capaian[]>({
    queryKey: ["pencapaian", studentId],
    queryFn: () => getPencapaian(studentId),
  });
  console.log(query.data);

  if (query.isLoading) {
    return <div>Still Loading . . .</div>;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  const data = query.data || [];

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      <div className="flex flex-1">
        {/* Content Section */}
        <div className="main-content flex-1 ml-44 top-auto flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="bg-[#fcce7e] p-1 mt-5 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
              <h1 className="text-lg font-bold text-center">
                PENCAPAIAN SISWA
              </h1>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {data && data.length > 0 ? ( // Memeriksa apakah data ada dan panjangnya lebih dari 0
                  data.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#fcce7e] p-4 rounded-lg shadow-lg text-center"
                    >
                      <h2 className="text-lg font-bold">{item.judul}</h2>
                      <p className="text-sm">{item.deskripsi}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(item.tanggal).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-sm bg-[#fcce7e] p-2 w-auto mt-auto mb-auto shadow-lg rounded-lg">
                    Belum terlihat Pencapaian.. <br />
                    Tetap Semangat dan Jangan Menyerah!"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pencapaian;
