"use client";
import Sidebarstudents from "@/components/contents/Sidebarstudents";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebarstudents />
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
