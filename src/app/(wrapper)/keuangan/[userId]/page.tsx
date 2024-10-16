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
import { useQuery } from "@tanstack/react-query";
import getKeuangan from "@/api/getKeuangan";

// Define the type for transaksi
interface Transaksi {
  id: number;
  nis: string;
  nama: string;
  tanggal: string;
  debit: number;
  kredit: number;
  detailPembayaran: string;
}

// Example data
const transaksi: Transaksi[] = [
  {
    id: 1,
    nis: "123456",
    nama: "John Doe",
    tanggal: "2024-08-20",
    debit: 500000,
    kredit: 0,
    detailPembayaran: "SPP - Pembayaran Bulan Agustus",
  },
  {
    id: 2,
    nis: "789012",
    nama: "Jane Smith",
    tanggal: "2024-08-21",
    debit: 500000,
    kredit: 0,
    detailPembayaran: "SPP - Pembayaran Bulan Agustus",
  },
  {
    id: 3,
    nis: "345678",
    nama: "Alice Johnson",
    tanggal: "2024-08-22",
    debit: 0,
    kredit: 200000,
    detailPembayaran: "Pembayaran Seragam",
  },
  {
    id: 4,
    nis: "290504",
    nama: "Bob Brown",
    tanggal: "2024-08-31",
    debit: 0,
    kredit: 700000,
    detailPembayaran: "Pembayaran Uang Study Tour",
  },
];

// Calculate total balance (debit - credit)
const totalBalance = transaksi.reduce(
  (acc, trx) => acc + trx.debit - trx.kredit,
  0
);

const Keuangan: React.FC = ({ params }) => {
  console.log(params.userId);
  const query = useQuery({
    queryKey: ["keuangan", params.userId],
    queryFn: () => getKeuangan(params.userId),
  });
  console.log(query.data);
  return (
    <main className="flex flex-col min-h-screen bg-[#f5f5dc] bg-opacity-20">
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
            <h1 className="text-lg font-bold text-center">MODUL KEUANGAN</h1>
          </div>

          {/* NIS, Nama, and Balance Summary */}
          <div className="mt-4 bg-white p-4 rounded-md shadow-md">
            <p>
              <strong>NIS:</strong> {transaksi[0].nis}
            </p>
            <p>
              <strong>Nama:</strong> {transaksi[0].nama}
            </p>
            <p>
              <strong>Total Keuangan:</strong> Rp{" "}
              {totalBalance.toLocaleString("id-ID")}
            </p>
          </div>

          {/* Transaction Table */}
          <main className="mt-6">
            <table className="w-full mt-5 bg-white border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b-2 border-gray-300">
                    ID Transaksi
                  </th>
                  <th className="p-3 border-b-2 border-gray-300">Tanggal</th>
                  <th className="p-3 border-b-2 border-gray-300">Debit (Rp)</th>
                  <th className="p-3 border-b-2 border-gray-300">
                    Kredit (Rp)
                  </th>
                  <th className="p-3 border-b-2 border-gray-300">
                    Detail Pembayaran
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((trx) => (
                  <tr key={trx.id} className="text-center border-t">
                    <td className="py-2">{trx.id}</td>
                    <td className="py-2">{trx.tanggal}</td>
                    <td className="py-2">
                      {trx.debit.toLocaleString("id-ID")}
                    </td>
                    <td className="py-2">
                      {trx.kredit.toLocaleString("id-ID")}
                    </td>
                    <td className="py-2">{trx.detailPembayaran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Keuangan;
