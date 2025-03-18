"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaMoneyBillWave,
  FaBook,
  FaClipboardList,
  FaTrophy,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import { FiChevronRight, FiX } from "react-icons/fi";
import { clearSession } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path: string) =>
    pathname === path
      ? "bg-yellow-500 text-white"
      : "text-gray-700 hover:text-yellow-500";
  const handleLogout = () => {
    clearSession(); // Hapus session dari cookies
    router.push("/loginadmin"); // Redirect ke halaman login admin
  };
  return (
    <div className="flex">
      {/* Tombol Toggle Sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-[55%] transform -translate-y-1/2 bg-[#fcce7e] text-black p-3 rounded-r-full shadow-lg hover:bg-[#fcce7e]transition md:hidden"
      >
        {isOpen ? <FiX size={24} /> : <FiChevronRight size={24} />}
      </button>
      <div
        className={`bg-white shadow-md min-h-screen p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <>
          <Link href="/">
            <Image
              src="/logolagi.png"
              alt="Logo Sekolah"
              width={150}
              height={150}
              className="cursor-pointer m-4"
            />
          </Link>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Admin Panel
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/admin"
                  )}`}
                >
                  <FaTachometerAlt /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/profilesiswa"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/admin/profilesiswa"
                  )}`}
                >
                  <FaUserGraduate /> <span>Profile Siswa</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/keuangan"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/admin/keuangan"
                  )}`}
                >
                  <FaMoneyBillWave /> <span>Keuangan</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/nilai"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/admin/nilai"
                  )}`}
                >
                  <FaBook /> <span>Nilai</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/pencapaian"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/admin/pencapaian"
                  )}`}
                >
                  <FaTrophy /> <span>Pencapaian</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/absen"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/admin/absen"
                  )}`}
                >
                  <FaClipboardList /> <span>Absensi</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-100 w-full"
                >
                  <FaArrowAltCircleLeft /> <span>Logout</span>
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
