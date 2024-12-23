"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BanknotesIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Using Admin Layout");
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <QueryClientProvider client={queryClient}>
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

        {/* Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="sidebar bg-[#fcce7e] fixed w-auto h-auto p-3 shadow-2xl">
            <ul className="flex flex-col gap-y-4">
              <li className="flex items-center">
                <HomeIcon className="h-6 w-6 text-black mr-2" />
                <Link
                  href="/admin"
                  className="block p-2 rounded hover:bg-[#f9b75e]"
                >
                  Dashboard Admin
                </Link>
              </li>
              <li className="flex items-center">
                <UserIcon className="h-6 w-6 text-black mr-2" />
                <Link
                  href="/admin/adminProfil"
                  className="block p-2 rounded hover:bg-[#f9b75e]"
                >
                  Admin Profil
                </Link>
              </li>
              <li className="flex items-center">
                <BanknotesIcon className="h-6 w-6 text-black mr-2" />
                <Link
                  href="/admin/adminKeuangan"
                  className="block p-2 rounded hover:bg-[#f9b75e]"
                >
                  Admin Keuangan
                </Link>
              </li>
              <li className="flex items-center">
                <ChartBarIcon className="h-6 w-6 text-black mr-2" />
                <Link
                  href="/admin/adminNilai"
                  className="block p-2 rounded hover:bg-[#f9b75e]"
                >
                  Admin Nilai
                </Link>
              </li>
              <li className="flex items-center">
                <TrophyIcon className="h-6 w-6 text-black mr-2" />
                <Link
                  href="/admin/adminPencapaian"
                  className="block p-2 rounded hover:bg-[#f9b75e]"
                >
                  Admin Pencapaian
                </Link>
              </li>
              <li className="flex items-center">
                <CalendarIcon className="h-6 w-6 text-black mr-2" />
                <Link
                  href="/admin/adminAbsen"
                  className="block p-2 rounded hover:bg-[#f9b75e]"
                >
                  Admin Absen
                </Link>
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="flex-1 mr-auto p-6">{children}</main>
        </div>

        {/* Footer */}
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
      </QueryClientProvider>
    </div>
  );
}
