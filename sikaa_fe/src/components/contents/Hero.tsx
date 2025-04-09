import React from "react";
import { FaRegLightbulb, FaClipboardList, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative py-10 text-gray-900">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left: Welcome Text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
              Welcome to <br />{" "}
              <span className="text-yellow-700">
                SMA-SMK ADVENT KLABAT MANADO
              </span>
            </h1>
            <p className="text-lg text-gray-800 mb-8 animate-fadeIn">
              Tempat pendidikan yang berfokus pada pengembangan karakter, iman,
              dan prestasi akademik.
            </p>
            <a
              href="/tentang"
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-700 transition"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>

          {/* Right: Illustration Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
            <Image
              src="/logolagi.png"
              alt="Sekolah"
              width={400}
              height={400}
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Content Section: Visi, Misi, Objektif */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Visi */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
            <FaRegLightbulb className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-2xl font-semibold text-gray-700">Visi</h3>
            <p className="text-gray-600 mt-2 text-center">
              “Berkarakter seperti Yesus Kristus, Mandiri serta berprestasi
              dalam Ilmu Pengetahuan dan Teknologi.”
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
            <FaClipboardList className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-2xl font-semibold text-gray-700">Misi</h3>
            <ul className="text-gray-600 mt-2 text-left list-disc list-inside">
              <li>Mewujudkan Pendidikan Advent yang beriman dan suka melayani.</li>
              <li>Mengembangkan kemampuan peserta didik dalam ilmu pengetahuan dan teknologi.</li>
              <li>Memotivasi peserta didik agar Kreatif, Berprestasi dan Mandiri.</li>
            </ul>
          </div>

          {/* Objektif */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
            <FaCheckCircle className="text-yellow-500 text-4xl mb-2" />
            <h3 className="text-2xl font-bold text-gray-800">Objektif</h3>
            <ul className="text-gray-700 mt-2 text-left list-disc list-inside">
              <li>Mengembalikan citra Allah dalam diri peserta didik.</li>
              <li>Mewujudkan peserta didik sehat jasmani, pikiran, rohani, dan sosial.</li>
              <li>Terbentuknya karakter peserta didik yang memiliki iman, berakhlak mulia, dan berbudi pekerti luhur berdasarkan Alkitab.</li>
              <li>Terwujudnya peserta didik berprestasi dan mandiri dalam ilmu pengetahuan serta keterampilan.</li>
              <li>Peserta didik mampu berpikir kreatif dan inovatif.</li>
              <li>Menghasilkan lulusan yang mencintai Tuhan, sesama manusia, dan lingkungan.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
