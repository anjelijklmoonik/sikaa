"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { setSession } from "@/utils/cookies";
import { loginAdmin } from "@/app/api/auth";
import { Loader } from "lucide-react"; // ✅ Import Loader dari lucide-react
import Link from "next/link";

export const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ State untuk loading
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ✅ Set loading true saat login dimulai

    try {
      const response = await loginAdmin(username, password);

      if (response.token) {
        setSession(response.token, response.role);
        toast.success("Login berhasil sebagai Admin!");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        toast.error(response.message || "Login gagal!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false); // ✅ Set loading false setelah selesai
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
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
          Masuk ke Akun Admin
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {/* Button Login */}
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
