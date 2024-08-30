import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BookOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const Profil: NextPage = () => {
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

        {/* Content */}
        <div className="flex-1 ml-44 p-4 flex justify-center">
          <div className="bg-[#fcce7e] p-4 max-w-4xl w-full shadow-xl rounded-xl">
            <h1 className="text-2xl font-semibold ml-2 mb-4">PROFIL</h1>
            <div className="flex gap-4 items-start">
              {/* Profile Image */}
              <div className="flex-none flex items-center p-2">
                <Image
                  src="/do.jpeg"
                  alt="Profile Picture"
                  width={200}
                  height={250}
                />
              </div>

              {/* Biodata */}
              <div className="flex-auto p-2">
                <h2 className="text-xl font-semibold mb-2">Biodata</h2>
                <div className="space-y-2">
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama</div>
                    <div className="flex-1">John Doe</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nomor Induk Siswa</div>
                    <div className="flex-1">123356789</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Sekolah</div>
                    <div className="flex-1">SMA-SMK Advent Klabat Manado</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Kelas</div>
                    <div className="flex-1">12 IPA 1</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Jurusan</div>
                    <div className="flex-1">Biologi</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Alamat</div>
                    <div className="flex-1">Jalan Contoh No. 123</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Tempat/Tanggal Lahir</div>
                    <div className="flex-1">Manado, 1 Januari 2000</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Agama</div>
                    <div className="flex-1">Kristen</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Jenis Kelamin</div>
                    <div className="flex-1">Laki-laki</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No HP</div>
                    <div className="flex-1">081233567890</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Email</div>
                    <div className="flex-1">john.doe@example.com</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Ayah</div>
                    <div className="flex-1">Bapak Doe</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Ibu</div>
                    <div className="flex-1">Ibu Doe</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Ayah</div>
                    <div className="flex-1">081233567891</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Ibu</div>
                    <div className="flex-1">081233567892</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Wali</div>
                    <div className="flex-1">Wali Doe</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Wali</div>
                    <div className="flex-1">081233567893</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Profil;
