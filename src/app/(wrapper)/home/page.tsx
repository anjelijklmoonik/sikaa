"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      <div className="flex flex-1"></div>
      {/* Content */}
      <div className="flex-1 ml-44 mt-auto p-4 flex justify-center">
        <div className="flex flex-col gap-4">
          <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
            <h1 className="text-lg font-bold text-center">WELCOME TO SIKAA</h1>
          </div>
          <div className="bg-[#fcce7e] p-4 shadow-lg rounded-t-xl border border-gray-400 border-dashed border-b-0 text-center">
            <h2 className="text-lg font-bold">VISI</h2>
            <p>
              “Berkarakter seperti Yesus Kristus, Mandiri serta berprestasi
              dalam Ilmu Pengetahuan dan Teknologi.”
            </p>
          </div>
          <div className="bg-[#fcce7e] p-4 shadow-lg border border-gray-400 border-b-0 border-t-0 text-center">
            <h2 className="text-lg font-bold">MISI</h2>
            <p>
              1. Mewujudkan Pendidikan Advent yang beriman dan suka melayani.{" "}
              <br />
              2. Mengembangkan kemampuan peserta didik dalam ilmu pengetahuan
              dan teknologi. <br />
              3. Memotivasi peserta didik agar Kreatif, Berprestasi dan Mandiri.
            </p>
          </div>
          <div className="bg-[#fcce7e] mb-1 p-4 shadow-lg rounded-b-xl border border-gray-400 border-t-0 border-dashed text-center">
            <h2 className="text-lg font-bold">OBJEKTIF</h2>
            <p>
              1. Mengembalikan citra Allah dalam diri peserta didik. <br />
              2. Mewujudkan peserta didik sehat jasmani, pikiran, rohani dan
              sosial. <br />
              3. Terbentuknya karakter peserta didik yang memiliki iman
              berakhlak mulia dan berbudi pekerti luhur berdasarkan Alkitab.
              <br />
              4. Terwujudnya peserta didik berprestasi dan mandidi dalam Ilmu
              Pengetahuan, Keterampilan. <br />
              5. Peserta didik mampu berpikir kreatif dan inovatif. <br />
              6. Menghasilkan lulusan yang mencintai TUHAN, serta manusia dan
              lingkungan. <br />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
