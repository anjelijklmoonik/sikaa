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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getAbsen from "@/api/getApi/(wrapper)/getAbsen";

type AbsensiType = {
  mataPelajaran: string;
  status: string;
  tanggal: string; // New field for date
};

type SemesterType = {
  semester: number;
  absensiKelas: AbsensiType[];
  absensiChapel: AbsensiType[];
  expanded: boolean;
};

const Absen = ({ params }) => {
  console.log(params.userId);
  const query = useQuery({
    queryKey: ["absen", params.userId],
    queryFn: () => getAbsen(params.userId),
  });
  console.log(query.data);
  const [semesterData, setSemesterData] = useState<SemesterType[]>([
    {
      semester: 1,
      absensiKelas: [
        { mataPelajaran: "Matematika", status: "Sakit", tanggal: "2024-09-02" },
        {
          mataPelajaran: "Bahasa Indonesia",
          status: "Sakit",
          tanggal: "2024-09-02",
        },
        { mataPelajaran: "Fisika", status: "Sakit", tanggal: "2024-09-02" },
        { mataPelajaran: "Biolgi", status: "Sakit", tanggal: "2024-09-02" },
      ],
      absensiChapel: [
        {
          mataPelajaran: "Chapel 1",
          status: "Tidak Hadir",
          tanggal: "2024-09-02",
        },
        {
          mataPelajaran: "Chapel 2",
          status: "Tidak Hadir",
          tanggal: "2024-09-02",
        },
      ],
      expanded: false,
    },

    {
      semester: 2,
      absensiKelas: [
        { mataPelajaran: "Matematika", status: "Sakit", tanggal: "2024-09-02" },
        {
          mataPelajaran: "Bahasa Indonesia",
          status: "Sakit",
          tanggal: "2024-09-02",
        },
        { mataPelajaran: "Fisika", status: "Sakit", tanggal: "2024-09-02" },
        { mataPelajaran: "Biolgi", status: "Sakit", tanggal: "2024-09-02" },
      ],
      absensiChapel: [
        {
          mataPelajaran: "Chapel 1",
          status: "Tidak Hadir",
          tanggal: "2024-09-02",
        },
        {
          mataPelajaran: "Chapel 2",
          status: "Tidak Hadir",
          tanggal: "2024-09-02",
        },
      ],
      expanded: false,
    },

    {
      semester: 3,
      absensiKelas: [
        { mataPelajaran: "Matematika", status: "Sakit", tanggal: "2024-09-02" },
        {
          mataPelajaran: "Bahasa Indonesia",
          status: "Sakit",
          tanggal: "2024-09-02",
        },
        { mataPelajaran: "Fisika", status: "Sakit", tanggal: "2024-09-02" },
        { mataPelajaran: "Biolgi", status: "Sakit", tanggal: "2024-09-02" },
      ],
      absensiChapel: [
        {
          mataPelajaran: "Chapel 1",
          status: "Tidak Hadir",
          tanggal: "2024-09-02",
        },
        {
          mataPelajaran: "Chapel 2",
          status: "Tidak Hadir",
          tanggal: "2024-09-02",
        },
      ],
      expanded: false,
    },

    // More semesters can be added similarly
  ]);

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleExpand = (index: number) => {
    const updatedData = semesterData.map((semester, idx) => {
      if (index === idx) {
        return { ...semester, expanded: !semester.expanded };
      }
      return semester;
    });
    setSemesterData(updatedData);
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
  };

  const renderStatus = (status: string, subject: string) => {
    switch (status) {
      case "Hadir":
        return (
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => handleSubjectClick(subject)}
          >
            Click
          </span>
        );
      case "Tidak Hadir":
        return (
          <div>
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => handleSubjectClick(subject)}
            >
              click
            </span>
            {selectedSubject === subject && (
              <div className="ml-4 mt-2 text-gray-600">
                <p className="font-semibold">Keterangan:</p>
                <ul>
                  {semesterData
                    .flatMap((semester) =>
                      semester.absensiKelas.concat(semester.absensiChapel)
                    )
                    .filter(
                      (absen) =>
                        absen.mataPelajaran === subject &&
                        absen.status === "Tidak Hadir"
                    )
                    .map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span>{detail.tanggal}</span>
                        <span className="text-gray-500">Tidak Hadir</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        );
      case "Izin":
        return (
          <div>
            <span
              className="text-yellow-500 cursor-pointer"
              onClick={() => handleSubjectClick(subject)}
            >
              Click
            </span>
            {selectedSubject === subject && (
              <div className="ml-4 mt-2 text-gray-600">
                <p className="font-semibold">Keterangan:</p>
                <ul>
                  {semesterData
                    .flatMap((semester) =>
                      semester.absensiKelas.concat(semester.absensiChapel)
                    )
                    .filter(
                      (absen) =>
                        absen.mataPelajaran === subject &&
                        absen.status === "Izin"
                    )
                    .map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span>{detail.tanggal}</span>
                        <span className="text-gray-500">Izin</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        );
      case "Sakit":
        return (
          <div>
            <span
              className="text-gray-500 cursor-pointer"
              onClick={() => handleSubjectClick(subject)}
            >
              Click
            </span>
            {selectedSubject === subject && (
              <div className="ml-4 mt-2 text-gray-600">
                <p className="font-semibold">Keterangan:</p>
                <ul>
                  {semesterData
                    .flatMap((semester) =>
                      semester.absensiKelas.concat(semester.absensiChapel)
                    )
                    .filter(
                      (absen) =>
                        absen.mataPelajaran === subject &&
                        absen.status === "Sakit"
                    )
                    .map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span>{detail.tanggal}</span>
                        <span className="text-gray-500">Sakit</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        );
      default:
        return status;
    }
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
            <h1 className="text-lg font-bold text-center">ABSENSI</h1>
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
                          <h3 className="font-bold">Absensi Kelas:</h3>
                          <ul>
                            {item.absensiKelas.map((absen, idx) => (
                              <li key={idx} className="mb-2 cursor-pointer">
                                <div className="flex justify-between items-center">
                                  <span className="flex-1">
                                    {absen.mataPelajaran}
                                  </span>
                                  <span className="flex-1 text-center">
                                    {renderStatus(
                                      absen.status,
                                      absen.mataPelajaran
                                    )}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <h3 className="font-bold mt-4">Absensi Chapel:</h3>
                          <ul>
                            {item.absensiChapel.map((absen, idx) => (
                              <li key={idx} className="mb-2 cursor-pointer">
                                <div className="flex justify-between items-center">
                                  <span className="flex-1">
                                    {absen.mataPelajaran}
                                  </span>
                                  <span className="flex-1 text-center">
                                    {renderStatus(
                                      absen.status,
                                      absen.mataPelajaran
                                    )}
                                  </span>
                                </div>
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

      {/* Footer */}
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

export default Absen;
