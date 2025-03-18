import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-300 p-4 mt-auto flex flex-col md:flex-row justify-between items-center text-gray-700">
      {/* Copyright */}
      <p className="text-sm text-center md:text-left">
        &copy; 2024 SMA-SMK ADVENT KLABAT MANADO. All rights reserved.
      </p>

      {/* Social Media Links */}
      <div className="flex space-x-4 mt-2 md:mt-0">
        <Link href="https://facebook.com" target="_blank">
          <FaFacebook className="text-gray-700 hover:text-blue-600 text-xl transition" />
        </Link>
        <Link href="https://instagram.com" target="_blank">
          <FaInstagram className="text-gray-700 hover:text-pink-600 text-xl transition" />
        </Link>
        <Link href="https://youtube.com" target="_blank">
          <FaYoutube className="text-gray-700 hover:text-red-600 text-xl transition" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
