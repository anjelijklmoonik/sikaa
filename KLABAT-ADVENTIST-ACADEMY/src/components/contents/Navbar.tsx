"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavbarMobile from "./NavbarMobile";
import { clearSession, getSession } from "@/utils/cookies";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Ambil session saat komponen pertama kali dimuat
  useEffect(() => {
    const session = getSession();
    if (session?.token) {
      setIsLoggedIn(true);
      setUserRole(session.role??null); ;
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.reload(); // Reload halaman agar efek langsung terlihat
  };

  // Tentukan Dashboard Berdasarkan Role
  const getDashboardPath = () => {
    if (userRole === "ADMIN") return "/admin";
    if (userRole === "STUDENT") return "/students";
    if (userRole === "PARENT") return "/parents";
    return "/"; // Default jika tidak ada role
  };

  return (
    <>
      {/* Navbar Desktop */}
      <nav className="bg-[#fcce7e] px-6 py-4 shadow-md hidden md:flex">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo dan Nama Sekolah */}
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image
                src="/logolagi.png"
                alt="Logo 1"
                width={100}
                height={100}
              />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-lg font-medium">
                SMA-SMK ADVENT KLABAT MANADO
              </h1>
              <h1 className="text-lg font-medium">SMABAT SETIA</h1>
            </div>
          </div>

          {/* Divider dan Login/Logout */}
          <div className="flex items-center space-x-4 relative">
            {/* Divider */}
            <div className="h-6 w-px bg-gray-400"></div>

            {/* Jika Sudah Login, Tampilkan Dashboard & Logout */}
            {isLoggedIn ? (
              <>
                <Link href={getDashboardPath()}>
                  <Button
                    variant="ghost"
                    className="text-blue-700 text-[16px] font-semibold cursor-pointer hover:text-blue-900 transition duration-200"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-red-700 text-[16px] font-semibold cursor-pointer hover:text-red-900 transition duration-200"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Jika Belum Login, Tampilkan Tombol Login */}
                <Button
                  variant="ghost"
                  className="text-red-700 text-[16px] font-semibold cursor-pointer hover:text-red-900 transition duration-200"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  Log in
                </Button>

                {/* Dropdown Menu Login */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 w-48 bg-white shadow-lg rounded-lg z-10">
                    <ul className="text-gray-700 text-sm py-2">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Link href="/loginstudents">Login sebagai Siswa</Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Link href="/loginparents">Login sebagai Orang Tua</Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Link href="/loginadmin">Login sebagai Admin</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Navbar Mobile (Hanya muncul di tampilan mobile) */}
      <div className="md:hidden">
        <NavbarMobile />
      </div>
    </>
  );
};

export default Navbar;
