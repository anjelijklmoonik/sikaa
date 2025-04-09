"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaMoneyBillWave,
  FaClipboardList,
  FaBook,
  FaArrowAltCircleLeft,
  FaTrophy,
} from "react-icons/fa";
import { FiChevronRight, FiX } from "react-icons/fi";
import Image from "next/image";
import { clearSession } from "@/utils/cookies";
import { useRouter } from "next/navigation";
const Sidebarparents = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    clearSession(); 
    router.push("/loginparents");
  };
  // Fungsi untuk menentukan apakah link aktif
  const isActive = (path: string) =>
    pathname === path
      ? "bg-yellow-500 text-white"
      : "text-gray-700 hover:text-yellow-500";

  return (
    <div className="flex">
      {/* Tombol Toggle Sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-[55%] transform -translate-y-1/2 bg-[#fcce7e] text-black p-3 rounded-r-full shadow-lg hover:bg-[#fcce7e] transition md:hidden"
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
              Parents Panel
            </h2>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/parents"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/parents"
                  )}`}
                >
                  <FaTachometerAlt /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parents/tagihan"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/parents/tagihan"
                  )}`}
                >
                  <FaMoneyBillWave /> <span>Tagihan</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parents/absen"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/parents/absen"
                  )}`}
                >
                  <FaClipboardList /> <span>Absen</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parents/nilai"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/parents/nilai"
                  )}`}
                >
                  <FaBook /> <span>Nilai</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parents/pencapaian"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/parents/pencapaian"
                  )}`}
                >
                  < FaTrophy/> <span>Pencapaian</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parents/profile"
                  className={`flex items-center space-x-3 px-4 py-2 rounded-md ${isActive(
                    "/parents/profile"
                  )}`}
                >
                  <FaUserGraduate /> <span>Profile</span>
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

export default Sidebarparents;
