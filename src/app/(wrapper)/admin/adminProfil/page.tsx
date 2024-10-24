"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import addProfil from "@/api/postApi/(wrapper)/postProfil";

const profilAdmin = () => {
  const queryClient = useQueryClient();

  const [foto, setFoto] = useState("");
  const [nama, setNama] = useState("");
  const [noIndukSiswa, setNoIndukSiswa] = useState("");
  const [sekolah, setSekolah] = useState("");
  const [kelas, setKelas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ttl, setTtl] = useState("");
  const [agama, setAgama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [namaAyah, setNamaAyah] = useState("");
  const [namaIbu, setNamaIbu] = useState("");
  const [noTelpAyah, setNoTelpAyah] = useState("");
  const [noTelpIbu, setNoTelpIbu] = useState("");
  const [namaWali, setNamaWali] = useState("");
  const [noTelpWali, setNoTelpWali] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [studentProfilId, setStudentProfilId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: addProfil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profil"] });
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfilId) {
      mutation.mutate({
        foto,
        nama,
        noIndukSiswa,
        sekolah,
        kelas,
        jurusan,
        alamat,
        ttl,
        agama,
        jenisKelamin,
        noTelp,
        email,
        namaAyah,
        namaIbu,
        noTelpAyah,
        noTelpIbu,
        namaWali,
        noTelpWali,
        academicYear,
      });
    }
  };
};
