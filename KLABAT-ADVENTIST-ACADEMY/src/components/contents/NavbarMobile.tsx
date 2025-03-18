"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "../ui/button";

const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#fcce7e] px-6 py-4 shadow-md md:hidden">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image src="/logolagi.png" alt="Logo" width={100} height={100} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium">SMA-SMK ADVENT KLABAT MANADO</h1>
          </div>
        </div>

        {/* Hamburger Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 text-2xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
            {/* Divider */}
            <div className="h-px bg-gray-400 my-2"></div>

            {/* Tombol Login dengan Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                className="w-full text-red-700 font-semibold cursor-pointer hover:text-red-900 transition duration-200 text-left"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                Log in
              </Button>

              {isDropdownOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-lg p-2">
                  <ul className="text-gray-700 text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setDropdownOpen(false); setIsOpen(false); }}>
                      <Link href="/loginstudents">Login sebagai Siswa</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setDropdownOpen(false); setIsOpen(false); }}>
                      <Link href="/loginparents">Login sebagai Orang Tua</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setDropdownOpen(false); setIsOpen(false); }}>
                      <Link href="/loginadmin">Login sebagai Admin</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarMobile;
