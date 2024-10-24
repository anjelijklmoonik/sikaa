"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import addPencapaian from "@/api/postApi/(wrapper)/postPencapaian";

const pencapaianAdmin = () => {
  const queryClient = useQueryClient();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [studentProfilId, setStudentProfilId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: addPencapaian,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pencapaian"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfilId) {
      mutation.mutate({ judul, deskripsi, tanggal, studentProfilId });
    }
  };

  return (
    <div className="admin-page bg-[#fcce7e]">
      <h1>Tambahkan Pencapaian</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ID Siswa</label>
          <input
            type="number"
            value={studentProfilId || ""}
            onChange={(e) => setStudentProfilId(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Tambahkan</button>
      </form>
      {mutation.isError && <p>Error: {(mutation.error as Error).message}</p>}
      {mutation.isSuccess && (
        <p>
          Berhasil menambahkan Pencapaian.{" "}
          <Link href={`/pencapaian/${studentProfilId}`}>Lihat Pencapaian</Link>
        </p>
      )}
    </div>
  );
};

export default pencapaianAdmin;
