import Image from "next/image";
import Link from "next/link";
import { NextPage } from "next";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  BookOpenIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

const Login: NextPage = () => {
  return (
    <main className="relative min-h-screen bg-[#f5f5dc] flex flex-col">
      {/*Content*/}

      {/* Footer */}
      <footer className="bg-gray-300 p-4 text-center mt-auto">
        <p className="text-sm">
          &copy; 2024 SMA-SMK ADVENT KLABAT MANADO. All rights reserved.
        </p>
      </footer>
    </main>
  );
};

export default Login;
