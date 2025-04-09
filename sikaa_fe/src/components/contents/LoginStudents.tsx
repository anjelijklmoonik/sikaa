"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setSession } from "@/utils/cookies";
import { FaUser, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { loginStudent } from "@/app/api/auth";
import { Loader } from "lucide-react";
export const LoginStudents = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // ✅ Log data yang dikirim
      console.log("📤 Mengirim Request Login:", { username, password });
  
      // Kirim request login ke backend
      const response = await loginStudent(username, password);
  
      // ✅ Log response yang diterima
      console.log("✅ Login Berhasil, Response:", response);
  
      if (response.token) {
        setSession(response.token, response.role);
  
        // ✅ Log token & role untuk debugging
        console.log("🔑 Token:", response.token);
        console.log("🎭 Role:", response.role);
  
        toast.success("Login berhasil sebagai Siswa!");
        router.push("/students");
      } else {
        console.log("⚠️ Login Gagal, Pesan API:", response.message);
        toast.error(response.message || "Login gagal!");
      }
    } catch (error: any) {
      // ✅ Log error detail dari server
      console.error("❌ Login Gagal, Error:", error.response?.data || error.message);
  
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Logo dengan Link ke Home */}
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image
              src="/logolagi.png"
              alt="Logo Sekolah"
              width={150}
              height={150}
              className="cursor-pointer"
            />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Masuk ke Akun Siswa
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Input Username */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold flex justify-center items-center"
            disabled={loading} // ✅ Button disabled saat loading
          >
            {loading ? (
              <Loader className="animate-spin mr-2" size={20} /> // ✅ Loader Animasi
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
