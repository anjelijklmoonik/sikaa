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

// Define a type for the school rules
type Rule = {
  title: string;
  description: string;
};

// Sample data for school rules
const rules: Rule[] = [
  {
    title: "Kedisiplinan",
    description:
      "Siswa harus datang tepat waktu dan mematuhi jadwal yang telah ditentukan oleh sekolah.",
  },
  {
    title: "Seragam",
    description:
      "Siswa wajib mengenakan seragam sekolah sesuai dengan peraturan yang berlaku pada hari tersebut.",
  },
  {
    title: "Kebersihan",
    description:
      "Siswa harus menjaga kebersihan lingkungan sekolah dan membuang sampah pada tempatnya.",
  },
  // Add more rules as needed
];

// React component for the school rules page
const Aturan: React.FC = () => {
  return (
    <main className="relative min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      {/* Header */}
      <header className="bg-[#fcce7e] p-1">
        <div className="flex flex-row gap-x-10 items-center">
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
          <header className="bg-[#fcce7e] p-1 rounded-md">
            <div className="flex flex-row gap-x-5 items-center">
              <div>
                <h1 className="text-xl font-bold text-black">ATURAN SEKOLAH</h1>
              </div>
            </div>
          </header>

          <main className="mt-6">
            <div className="mt-5 bg-white p-4">
              {rules.map((rule, index) => (
                <div key={index} className="p-3 mb-4 border-b border-gray-300">
                  <h3 className="text-lg font-bold">
                    {index + 1}. {rule.title}
                  </h3>
                  <p>{rule.description}</p>
                </div>
              ))}
            </div>
          </main>
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

export default Aturan;
