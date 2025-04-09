"use client";
import Sidebar from "@/components/contents/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar akan selalu ada di setiap halaman dalam /admin */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
