import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-100">
      <h1 className="text-9xl font-extrabold text-black relative">
        404
        <span className="absolute inset-0 text-yellow-400 blur-md opacity-50">
          404
        </span>
      </h1>
      <p className="text-xl font-bold text-black mt-2">PAGE NOT FOUND</p>
      <p className="text-gray-600 mt-2">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>

      <Link href="/">
        <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold transition">
          Kembali ke Home
        </button>
      </Link>
    </main>
  );
}
