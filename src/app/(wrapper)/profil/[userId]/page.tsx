"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import getProfil from "@/api/getApi/(wrapper)/getProfil";
import { NextPage } from "next";

const Profil: NextPage = ({ params }) => {
  console.log(params.userId);
  const query = useQuery({
    queryKey: ["profil", params.userId],
    queryFn: () => getProfil(params.userId),
  });
  console.log(query.data);

  if (query.isLoading) {
    return <div>This Page still Loading . . .</div>;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  const data = query.data;

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      <div className="flex flex-1">
        {/* Content */}
        <div className="flex-1 ml-44 p-4 flex justify-center">
          <div className="bg-[#fcce7e] p-4 max-w-4xl mt-1 w-full shadow-xl rounded-xl">
            <h1 className="text-2xl font-semibold ml-2 mb-4">PROFIL</h1>
            <div className="flex gap-4 items-start">
              {/* Profile Image */}
              <div className="flex-none flex items-center p-2">
                <Image
                  src="/do.jpeg"
                  alt="Profile Picture"
                  width={200}
                  height={250}
                />
              </div>

              {/* Biodata */}
              <div className="flex-auto p-2">
                <h2 className="text-xl font-semibold mb-2">Biodata</h2>
                <div className="space-y-2">
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama</div>
                    <div className="flex-1">{data.nama}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nomor Induk Siswa</div>
                    <div className="flex-1">{data.noIndukSiswa}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Sekolah</div>
                    <div className="flex-1">{data.sekolah}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Kelas</div>
                    <div className="flex-1">{data.kelas}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Jurusan</div>
                    <div className="flex-1">{data.jurusan}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Alamat</div>
                    <div className="flex-1">{data.alamat}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Tempat/Tanggal Lahir</div>
                    <div className="flex-1">{data.ttl}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Agama</div>
                    <div className="flex-1">{data.agama}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Jenis Kelamin</div>
                    <div className="flex-1">{data.jenisKelamin}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No HP</div>
                    <div className="flex-1">{data.noTelp}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Email</div>
                    <div className="flex-1">{data.email}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Ayah</div>
                    <div className="flex-1">{data.namaAyah}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Ibu</div>
                    <div className="flex-1">{data.namaIbu}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Ayah</div>
                    <div className="flex-1">{data.noTelpAyah}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Ibu</div>
                    <div className="flex-1">{data.noTelpIbu}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">Nama Wali</div>
                    <div className="flex-1">{data.namaWali}</div>
                  </div>
                  <div className="flex items-center bg-white bg-opacity-10 p-2 rounded">
                    <div className="w-1/3 font-bold">No. Telp Wali</div>
                    <div className="flex-1">{data.noTelpWali}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profil;
