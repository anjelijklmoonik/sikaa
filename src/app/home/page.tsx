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

export default function Home() {
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
              <CalendarIcon className="h-6 w-6 text-black mr-2" />{" "}
              {/* Pastikan ikon ini ada atau ganti dengan ikon lain */}
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
        <div className="flex-1 ml-44 mt-auto p-4 flex justify-center">
          <div className="flex flex-col gap-4">
            <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
              <h1 className="text-lg font-bold text-center">
                WELCOME TO SIKAA
              </h1>
            </div>
            <div className="bg-[#fcce7e] p-4 shadow-lg rounded-t-xl border border-gray-400 border-dashed border-b-0">
              <h2 className="text-lg font-bold">VISI</h2>
              <p>
                “Berkarakter seperti Yesus Kristus, Mandiri serta berprestasi
                dalam Ilmu Pengetahuan dan Teknologi.”
              </p>
            </div>
            <div className="bg-[#fcce7e] p-4 shadow-lg border border-gray-400 border-b-0 border-t-0">
              <h2 className="text-lg font-bold">MISI</h2>
              <p>
                1. Mewujudkan Pendidikan Advent yang beriman dan suka melayani.{" "}
                <br />
                2. Mengembangkan kemampuan peserta didik dalam ilmu pengetahuan
                dan teknologi. <br />
                3. Memotivasi peserta didik agar Kreatif, Berprestasi dan
                Mandiri.
              </p>
            </div>
            <div className="bg-[#fcce7e] mb-1 p-4 shadow-lg rounded-b-xl border border-gray-400 border-t-0 border-dashed">
              <h2 className="text-lg font-bold">OBJEKTIF</h2>
              <p>
                1. Mengembalikan citra Allah dalam diri peserta didik. <br />
                2. Mewujudkan peserta didik sehat jasmani, pikiran, rohani dan
                sosial. <br />
                3. Terbentuknya karakter peserta didik yang memiliki iman
                berakhlak mulia dan berbudi pekerti luhur berdasarkan Alkitab.
                <br />
                4. Terwujudnya peserta didik berprestasi dan mandidi dalam Ilmu
                Pengetahuan, Keterampilan. <br />
                5. Peserta didik mampu berpikir kreatif dan inovatif. <br />
                6. Menghasilkan lulusan yang mencintai TUHAN, serta manusia dan
                lingkungan. <br />
              </p>
            </div>
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
}
