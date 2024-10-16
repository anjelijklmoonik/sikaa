"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import getPencapaian from "@/api/getPencapaian";
import { NextPage } from "next";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

const Pencapaian: NextPage = ({ params }) => {
  console.log(params.userId);
  const query = useQuery({
    queryKey: ["pencapaian", params.userId],
    queryFn: () => getPencapaian(params.userId),
  });
  console.log(query.data);
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
                <div className="bg-[#fcce7e] p-4 rounded-lg shadow-lg text-center">
                  <p>
                    <strong>
                      JUARA I SEMESTER GANJIL <br /> KELAS 10
                    </strong>
                  </p>
                </div>
                <div className="bg-[#fcce7e] p-4 rounded-lg shadow-lg text-center">
                  <p>
                    <strong>test</strong>
                  </p>
                </div>
                <div className="bg-[#fcce7e] p-4 rounded-lg shadow-lg text-center">
                  <p>
                    <strong>-</strong>
                  </p>
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

export default Pencapaian;
