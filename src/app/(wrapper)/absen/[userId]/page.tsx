"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAbsen from "@/api/getApi/(wrapper)/getAbsen";
import React from "react";
import { NextPage } from "next";

const Absen: NextPage = ({ params }) => {
  console.log(params.userId);

  const query = useQuery({
    queryKey: ["absensi", params.userId],
    queryFn: () => getAbsen(params.userId),
  });

  console.log(query.data);

  const data = query.data;

  // State untuk mengatur apakah data semester akan ditampilkan
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>{query.error?.message || "Terdapat error."}</div>;
  }

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      <div className="flex-1 ml-64 p-4">
        <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
          <h1 className="text-lg font-bold text-center">ABSENSI</h1>
        </div>

        <div className="mt-5 bg-white">
          <table className="w-full bg-white border-collapse">
            <tbody>
              {/* Row untuk menampilkan semester */}
              <tr
                className="cursor-pointer text-center hover:bg-gray-100"
                onClick={handleExpand}
              >
                <td className="cursor-pointer text-center bg-[#fcce7e] p-3 rounded-lg shadow-md">
                  Semester 1
                </td>
              </tr>

              {/* Expanded rows jika data di-expand */}
              {expanded && (
                <>
                  {/* Tabel untuk Mata Pelajaran */}
                  <tr>
                    <td className="p-3 border-b border-gray-300">
                      <table className="w-full bg-gray-100 border-collapse">
                        <thead>
                          <tr>
                            <th className="p-3 border-b-2 border-gray-300">
                              Mata Pelajaran
                            </th>
                            <th className="p-3 border-b-2 border-gray-300">
                              Tanggal
                            </th>
                            <th className="p-3 border-b-2 border-gray-300">
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length > 0 ? (
                            data.map((absen: any) => (
                              <tr key={absen.id} className="text-center">
                                <td className="p-3 border-b border-gray-300">
                                  {absen.namaPelajaran}
                                </td>
                                <td className="p-3 border-b border-gray-300">
                                  {new Date(absen.tanggal).toLocaleDateString(
                                    "id-ID"
                                  )}
                                </td>
                                <td className="p-3 border-b border-gray-300">
                                  {absen.status}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={3}
                                className="p-3 text-center text-gray-500"
                              >
                                Data tidak ditemukan.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  {/* Tabel untuk Chapel Attendance */}
                  <tr>
                    <td className="p-3 border-b border-gray-300">
                      <table className="w-full bg-gray-100 border-collapse">
                        <thead>
                          <tr>
                            <th className="p-3 border-b-2 border-gray-300">
                              Tanggal Chapel
                            </th>
                            <th className="p-3 border-b-2 border-gray-300">
                              Keterangan
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.length > 0 ? (
                            data.map((absen: any) => (
                              <tr key={absen.id} className="text-center">
                                <td className="p-3 border-b border-gray-300">
                                  {new Date(
                                    absen.tanggalChapel
                                  ).toLocaleDateString("id-ID")}
                                </td>
                                <td className="p-3 border-b border-gray-300">
                                  {absen.statusChapel}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={2}
                                className="p-3 text-center text-gray-500"
                              >
                                Data chapel tidak ditemukan.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Absen;
