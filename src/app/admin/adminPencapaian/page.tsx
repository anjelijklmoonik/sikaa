"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import addPencapaian from "@/api/postApi/(wrapper)/postPencapaian";

const PencapaianAdmin = () => {
  const queryClient = useQueryClient();

  // State untuk form
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [studentProfilId, setStudentProfilId] = useState<number | null>(null);

  // Mutation untuk menambah pencapaian
  const mutation = useMutation({
    mutationFn: addPencapaian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pencapaian"] });
    },
  });

  // Fungsi submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfilId) {
      mutation.mutate({ judul, deskripsi, tanggal, studentProfilId });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] p-8">
      <div className="max-w-lg mx-auto bg-[#fcce7e] p-6 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Tambahkan Pencapaian
        </h1>

        {/* Form Pencapaian */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="judul" className="block text-sm font-medium">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="tanggal" className="block text-sm font-medium">
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="studentProfilId"
              className="block text-sm font-medium"
            >
              ID Siswa
            </label>
            <input
              type="number"
              id="studentProfilId"
              value={studentProfilId || ""}
              onChange={(e) => setStudentProfilId(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-[#fcce7e] font-bold py-2 rounded hover:bg-white focus:outline-none focus:ring focus:ring-blue-300"
          >
            Tambahkan
          </button>
        </form>

        {/* Menampilkan pesan error atau success */}
        <div className="mt-4">
          {mutation.isError && (
            <p className="text-red-500">
              Error: {(mutation.error as Error).message}
            </p>
          )}
          {mutation.isSuccess && (
            <p className="text-green-500">
              Pencapaian berhasil ditambahkan.{" "}
              <Link
                href={`/pencapaian/${studentProfilId}`}
                className="text-black underline"
              >
                Lihat Pencapaian
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PencapaianAdmin;
