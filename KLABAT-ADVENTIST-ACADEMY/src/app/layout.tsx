import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/styles/font";

export const metadata: Metadata = {
  title: "SMA-SMK ADVENT KLABAT MANADO",
  description: "Created by Code Mercs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#F8F8F8]${poppins.variable} font-sans`}>
        {children}
        </body>
    </html>
  );
}
