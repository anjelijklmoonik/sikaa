"use client"; // Add this directive at the top of the file

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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getNilai from "@/api/getNilai";

type MataPelajaranType = {
  mataPelajaran: string;
  nilai: number;
};

type SemesterType = {
  semester: number;
  mataPelajaran: MataPelajaranType[];
  expanded: boolean;
};

const Nilai = ({ params }) => {
  console.log(params.userId);
  const query = useQuery({
    queryKey: ["nilai", params.userId],
    queryFn: () => getNilai(params.userId),
  });
  console.log(query.data);
  const [semesterData, setSemesterData] = useState<SemesterType[]>([
    {
      semester: 1,
      mataPelajaran: [
        { mataPelajaran: "Matematika", nilai: 85 },
        { mataPelajaran: "Bahasa Indonesia", nilai: 80 },
        { mataPelajaran: "Fisika", nilai: 89 },
        { mataPelajaran: "Biologi", nilai: 100 },
      ],
      expanded: false,
    },
    {
      semester: 2,
      mataPelajaran: [
        { mataPelajaran: "Matematika", nilai: 75 },
        { mataPelajaran: "Bahasa Indonesia", nilai: 90 },
        { mataPelajaran: "Fisika", nilai: 87 },
        { mataPelajaran: "Biologi", nilai: 95 },
      ],
      expanded: false,
    },
    {
      semester: 3,
      mataPelajaran: [
        { mataPelajaran: "Matematika", nilai: 90 },
        { mataPelajaran: "Bahasa Indonesia", nilai: 95 },
        { mataPelajaran: "Fisika", nilai: 93 },
        { mataPelajaran: "Biologi", nilai: 95 },
      ],
      expanded: false,
    },
    {
      semester: 4,
      mataPelajaran: [
        { mataPelajaran: "Matematika", nilai: 78 },
        { mataPelajaran: "Bahasa Indonesia", nilai: 88 },
        { mataPelajaran: "Fisika", nilai: 85 },
        { mataPelajaran: "Biologi", nilai: 97 },
      ],
      expanded: false,
    },
    {
      semester: 5,
      mataPelajaran: [
        { mataPelajaran: "Matematika", nilai: 82 },
        { mataPelajaran: "Bahasa Indonesia", nilai: 92 },
        { mataPelajaran: "Fisika", nilai: 91 },
        { mataPelajaran: "Biologi", nilai: 96 },
      ],
      expanded: false,
    },
    {
      semester: 6,
      mataPelajaran: [
        { mataPelajaran: "Matematika", nilai: 86 },
        { mataPelajaran: "Bahasa Indonesia", nilai: 94 },
        { mataPelajaran: "Fisika", nilai: 89 },
        { mataPelajaran: "Biologi", nilai: 98 },
      ],
      expanded: false,
    },
  ]);

  const handleExpand = (index: number) => {
    const updatedData = semesterData.map((semester, idx) => {
      if (index === idx) {
        return { ...semester, expanded: !semester.expanded };
      }
      return semester;
    });
    setSemesterData(updatedData);
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
            <h1 className="text-xl font-bold font-serif">
              SMA-SMK ADVENT KLABAT MANADO
            </h1>
            <h2 className="text-lg font-serif">
              <em>SMABAT SETIA</em>
            </h2>
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
        <div className="flex-1 ml-64 p-4">
          <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
            <h1 className="text-lg font-bold text-center">
              NILAI-NILAI SEMESTER
            </h1>
          </div>

          {/* Main Content */}
          <div className="mt-5 bg-white">
            <table className="w-full bg-white border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b-2 border-gray-300">Semester</th>
                </tr>
              </thead>
              <tbody>
                {semesterData.map((item, index) => (
                  <>
                    <tr
                      key={index}
                      className="cursor-pointer text-center hover:bg-gray-100"
                      onClick={() => handleExpand(index)}
                    >
                      <td className="p-3 border-b border-gray-300">
                        Semester {item.semester}
                      </td>
                    </tr>
                    {item.expanded && (
                      <tr>
                        <td className="p-3 border-b border-gray-300">
                          <ul>
                            {item.mataPelajaran.map((mapel, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>{mapel.mataPelajaran}</span>
                                <span>{mapel.nilai}</span>
                              </li>
                            ))}
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

export default Nilai;
