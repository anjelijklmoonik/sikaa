"use client";

import Link from "next/link";
import Image from "next/image";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

type NilaiType = {
  semester: number;
  mataPelajaran: string;
  nilai: number;
  nilaiSemester1: number;
  nilaiSemester2: number;
  nilaiSemester3: number;
  expanded: boolean;
};

const Nilai = () => {
  const nilai: NilaiType[] = [
    {
      semester: 1,
      mataPelajaran: "Matematika",
      nilai: 80,
      nilaiSemester1: 85,
      nilaiSemester2: 75,
      nilaiSemester3: 90,
      expanded: false,
    },
    {
      semester: 1,
      mataPelajaran: "Bahasa Indonesia",
      nilai: 85,
      nilaiSemester1: 80,
      nilaiSemester2: 90,
      nilaiSemester3: 95,
      expanded: false,
    },
    {
      semester: 1,
      mataPelajaran: "Fisika",
      nilai: 88,
      nilaiSemester1: 89,
      nilaiSemester2: 87,
      nilaiSemester3: 93,
      expanded: false,
    },
    {
      semester: 1,
      mataPelajaran: "Biologi",
      nilai: 95,
      nilaiSemester1: 100,
      nilaiSemester2: 95,
      nilaiSemester3: 95,
      expanded: false,
    },
  ];

  const handleExpand = (index: number) => {
    nilai[index].expanded = !nilai[index].expanded;
  };

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
            <h1 className="text-xl font-bold">SMA-SMK ADVENT KLABAT MANADO</h1>
            <h2 className="text-lg">SMABAT SETIA</h2>
          </div>
        </div>
      </header>

      {/* Content Wrapper */}
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

        {/* Main Content */}
        <div className="flex-1 p-4 ml-64">
          <table className="w-full mt-5 bg-white border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-gray-300">No.</th>
                <th className="p-3 border-b-2 border-gray-300">
                  Mata Pelajaran
                </th>
                <th className="p-3 border-b-2 border-gray-300">Nilai</th>
              </tr>
            </thead>
            <tbody>
              {nilai.map((item, index) => (
                <>
                  <tr
                    key={index}
                    className="cursor-pointer text-center hover:bg-gray-100"
                    onClick={() => handleExpand(index)}
                  >
                    <td className="p-3 border-b border-gray-300">
                      {index + 1}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {item.mataPelajaran}
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      {item.nilai}
                    </td>
                  </tr>
                  {item.expanded && (
                    <tr>
                      <td colSpan={3} className="p-3 border-b border-gray-300">
                        <ul>
                          <li>Semester 1: {item.nilaiSemester1}</li>
                          <li>Semester 2: {item.nilaiSemester2}</li>
                          <li>Semester 3: {item.nilaiSemester3}</li>
                        </ul>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-gray-300 p-4 mt-auto flex justify-between items-center">
        <p className="text-sm">
          &copy; 2024 SMA-SMK ADVENT KLABAT MANADO. All rights reserved.
        </p>
        <div>
          <button className="bg-black hover:bg-[#f9b75e] text-white font-light py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </footer>
    </main>
  );
};

export default Nilai;
