"use client";
import Sidebarparents from "@/components/contents/Sidebarparents";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebarparents />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
