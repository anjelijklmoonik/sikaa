"use client";

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

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/components/app-sidebar";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const userId = params.userId;
  return (
    // <html lang="en" className="h-full bg-gray-100">
    //   <body className="flex flex-col min-h-screen">
    //     <QueryClientProvider client={queryClient}>
    //       <header className="bg-[#fcce7e] p-4">
    //         <div className="flex flex-row gap-x-5 items-center">
    //           <Image
    //             src="/logo.svg"
    //             alt="Logo"
    //             width={100}
    //             height={150}
    //             className="Logo.svg"
    //           />
    //           <div>
    //             <h1 className="text-xl font-bold font-serif">
    //               SMA-SMK ADVENT KLABAT MANADO
    //             </h1>
    //             <h2 className="text-lg font-serif">
    //               <em>SMABAT SETIA</em>
    //             </h2>
    //           </div>
    //         </div>
    //       </header>

    //       <div className="flex flex-1">
    //         {/* Sidebar */}
    //         <aside className="sidebar bg-[#fcce7e] fixed w-auto h-auto p-3 shadow-2xl">
    //           <ul className="flex flex-col gap-y-4">
    //             <li className="flex items-center">
    //               <HomeIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href="/home"
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Halaman Utama
    //               </Link>
    //             </li>
    //             <li className="flex items-center">
    //               <UserIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href={`/profil/${userId}`}
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Profil
    //               </Link>
    //             </li>
    //             <li className="flex items-center">
    //               <BanknotesIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href={`/keuangan/${userId}`}
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Keuangan
    //               </Link>
    //             </li>
    //             <li className="flex items-center">
    //               <ChartBarIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href={`/nilai/${userId}`}
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Nilai
    //               </Link>
    //             </li>
    //             <li className="flex items-center">
    //               <TrophyIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href={`/pencapaian/${userId}`}
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Pencapaian
    //               </Link>
    //             </li>
    //             <li className="flex items-center">
    //               <CalendarIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href={`/absen/${userId}`}
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Absen
    //               </Link>
    //             </li>
    //             <li className="flex items-center">
    //               <BookOpenIcon className="h-6 w-6 text-black mr-2" />
    //               <Link
    //                 href="/aturan"
    //                 className="block p-2 rounded hover:bg-[#f9b75e]"
    //               >
    //                 Aturan
    //               </Link>
    //             </li>
    //           </ul>
    //         </aside>

    //         {/* Main Content */}
    //         <main className="flex-1 p-4 bg-[#f5f5dc] bg-opacity-20 overflow-y-auto">
    //           {children}
    //         </main>
    //       </div>
    //       {/*Footer*/}
    //       <footer className="bg-gray-300 p-4 mb-auto relative">
    //         <div className="flex justify-between items-center text-xs">
    //           <div>
    //             <a
    //               href="https://goo.gl/maps/your-map-link"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="block text-blue-500 hover:underline"
    //             >
    //               Alamat: Jl. Daan Mogot No.11, Tikala Baru, Kec. Tikala, Kota
    //               Manado, Sulawesi Utara
    //             </a>
    //             <a
    //               href="mailto:smaadventklabat@gmail.com"
    //               className="block text-blue-500 hover:underline"
    //             >
    //               Email: smaadventklabat@gmail.com
    //             </a>
    //             <a
    //               href="tel:+0431798872"
    //               className="block text-blue-500 hover:underline"
    //             >
    //               No. Telp: 0431-798-872
    //             </a>
    //           </div>
    //         </div>
    //         <div className="absolute bottom-2 right-4 text-right">
    //           <p className="text-xs mb-1">
    //             &copy; 2024 SMA-SMK Advent Klabat Manado
    //           </p>
    //           <button className="bg-black hover:bg-[#f9b75e] text-white font-light py-2 px-4 rounded">
    //             Logout
    //           </button>
    //         </div>
    //       </footer>
    //     </QueryClientProvider>
    //   </body>
    // </html>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Enigma</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb> */}
              </div>
            </header>
            <div className="flex flex-1 flex-col p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
