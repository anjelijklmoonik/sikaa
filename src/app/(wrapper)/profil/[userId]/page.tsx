"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import getProfil from "@/api/getApi/(wrapper)/getProfil";
import { NextPage } from "next";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BookOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const Profil: NextPage = ({ params }) => {
  console.log(params.userId);
  const query = useQuery({
    queryKey: ["profil", params.userId],
    queryFn: () => getProfil(params.userId),
  });
  console.log(query.data);

  if (query.isLoading) {
    return <div>This Page still Loading . . .</div>;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  const data = query.data;

  return (
    <main className="relative min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      {/* Header */}
      <header className="bg-[#fcce7e] p-4">
        <div className="flex flex-row gap-x-5 items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={150}
            className="Logo.svg"
          />
          <div>
            <h1 className="text-xl font-bold font-serif">
              SMA-SMK ADVENT KLABAT MANADO
            </h1>
            <h2 className="text-lg font-serif">
              <em>SMABAT SETIA</em>
            </h2>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="sidebar fixed bg-[#fcce7e] w-auto h-auto top-auto p-3 shadow-2xl">
          <ul className="flex flex-col gap-y-4">
            <li className="flex items-center">
              <HomeIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/home"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Halaman Utama
              </Link>
            </li>
            <li className="flex items-center">
              <UserIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/profil"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Profil
              </Link>
            </li>
            <li className="flex items-center">
              <BanknotesIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/keuangan"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Keuangan
              </Link>
            </li>
            <li className="flex items-center">
              <ChartBarIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/nilai"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Nilai
              </Link>
            </li>
            <li className="flex items-center">
              <TrophyIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/pencapaian"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Pencapaian
              </Link>
            </li>
            <li className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/absen"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Absen
              </Link>
            </li>
            <li className="flex items-center">
              <BookOpenIcon className="h-6 w-6 text-black mr-2" />
              <Link
                href="/aturan"
                className="block p-2 rounded hover:bg-[#f9b75e]"
              >
                Aturan
              </Link>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 ml-44 p-4 flex justify-center">
          <div className="bg-[#fcce7e] p-4 max-w-4xl mt-1 w-full shadow-xl rounded-xl">
            <h1 className="text-2xl font-semibold ml-2 mb-4">PROFIL</h1>
            <div className="flex gap-4 items-start">
              {/* Profile Image */}
              <div className="flex-none flex items-center p-2">
                <Image
                  src="/do.jpeg"
                  alt="Profile Picture"
                  width={200}
                  height={250}
                />
              </div>

              {/* Biodata */}
              <div className="flex-auto p-2">
                <h2 className="text-xl font-semibold mb-2">Biodata</h2>
                <div className="space-y-2">
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama</div>
                    <div className="flex-1">{data.nama}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nomor Induk Siswa</div>
                    <div className="flex-1">{data.noIndukSiswa}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Sekolah</div>
                    <div className="flex-1">{data.sekolah}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Kelas</div>
                    <div className="flex-1">{data.kelas}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Jurusan</div>
                    <div className="flex-1">{data.jurusan}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Alamat</div>
                    <div className="flex-1">{data.alamat}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Tempat/Tanggal Lahir</div>
                    <div className="flex-1">{data.ttl}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Agama</div>
                    <div className="flex-1">{data.agama}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Jenis Kelamin</div>
                    <div className="flex-1">{data.jenisKelamin}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No HP</div>
                    <div className="flex-1">{data.noTelp}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Email</div>
                    <div className="flex-1">{data.email}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Ayah</div>
                    <div className="flex-1">{data.namaAyah}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Ibu</div>
                    <div className="flex-1">{data.namaIbu}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Ayah</div>
                    <div className="flex-1">{data.noTelpAyah}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Ibu</div>
                    <div className="flex-1">{data.noTelpIbu}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Wali</div>
                    <div className="flex-1">{data.namaWali}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Wali</div>
                    <div className="flex-1">{data.noTelpWali}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Footer*/}
      <footer className="bg-gray-300 p-4 mt-auto relative">
        <div className="flex justify-between items-center text-xs">
          <div>
            <a
              href="https://goo.gl/maps/your-map-link"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 hover:underline"
            >
              Alamat: Jl. Daan Mogot No.11, Tikala Baru, Kec. Tikala, Kota
              Manado, Sulawesi Utara
            </a>
            <a
              href="mailto:smaadventklabat@gmail.com"
              className="block text-blue-500 hover:underline"
            >
              Email: smaadventklabat@gmail.com
            </a>
            <a
              href="tel:+0431798872"
              className="block text-blue-500 hover:underline"
            >
              No. Telp: 0431-798-872
            </a>
          </div>
        </div>
        <div className="absolute bottom-2 right-4 text-right">
          <p className="text-xs mb-1">
            &copy; 2024 SMA-SMK Advent Klabat Manado
          </p>
          <button className="bg-black hover:bg-[#f9b75e] text-white font-light py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </footer>
    </main>
  );
};

export default Profil;
