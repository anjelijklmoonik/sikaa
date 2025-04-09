"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import { getJurusanDanKelas, postNilaiSiswa } from "@/app/api/admin";
import { Toaster, toast } from "react-hot-toast";

export default function PilihKelas() {
  const [kelasOptions, setKelasOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedSekolah, setSelectedSekolah] = useState<string | null>(null);
  const [selectedJurusan, setSelectedJurusan] = useState<number | null>(null);
  const [selectedKelas, setSelectedKelas] = useState<number | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [students, setStudents] = useState<{ value: any; label: string }[]>([]);
  const [selectedSiswa, setSelectedSiswa] = useState<any | null>(null);
  const [mapelOptions, setMapelOptions] = useState<
    { id: number; namaMapel: string }[]
  >([]);
  const [nilaiMapel, setNilaiMapel] = useState<{ [mapelId: number]: number }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jurusanOptions = [
    { value: 2, label: "Layanan Kesehatan" },
    { value: 3, label: "Akuntasi Keuangan Lembaga" },
  ];

  const semesterOptions = [
    { value: "GANJIL", label: "GANJIL" },
    { value: "GENAP", label: "GENAP" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getJurusanDanKelas();
      console.log("✅ Data fetched:", data);
    } catch (error) {
      toast.error("Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSekolahChange = (selected: any) => {
    setSelectedSekolah(selected?.value || null);
    setSelectedJurusan(selected?.value === "SMA" ? 1 : null);
    setSelectedKelas(null);
    setSelectedSemester(null);
    setStudents([]);
    setSelectedSiswa(null);
    setMapelOptions([]);

    // Atur pilihan kelas sesuai sekolah
    setKelasOptions([
      { value: "X", label: "X" },
      { value: "XI", label: "XI" },
      { value: "XII", label: "XII" },
    ]);
  };

  const handleJurusanChange = (selected: any) => {
    setSelectedJurusan(selected?.value || null);
    setSelectedKelas(null);
    setSelectedSemester(null);
    setStudents([]);
    setSelectedSiswa(null);
    setMapelOptions([]);
  };
  const handleKelasChange = async (selected: any) => {
    setSelectedKelas(selected?.value || null);
    setSelectedSemester(null);
    setStudents([]);
    setSelectedSiswa(null);
    setMapelOptions([]);
  };

  const handleSemesterChange = async (selected: any) => {
    setSelectedSemester(selected?.value || null);
    setStudents([]);
    setSelectedSiswa(null);
    setMapelOptions([]);

    if (!selected?.value || !selectedKelas) {
      toast.error("Pilih kelas terlebih dahulu.");
      return;
    }

    try {
      const response = await getJurusanDanKelas(); // Ambil data dari API
      console.log("📥 API Response:", response); // Debugging: Pastikan response berbentuk array atau objek
      const data = response?.data || response;

      if (!Array.isArray(data)) {
        toast.error("Format data tidak valid.");
        return;
      }
      const jurusanData = data.find((j: any) => j.id === selectedJurusan);
      if (!jurusanData) {
        toast.error("Jurusan tidak ditemukan.");
        return;
      }
      const kelasData = jurusanData.Kelas.find((kelas: any) => {
        const kelasNumber = String(kelas.noKelas).toUpperCase(); // Pastikan format string
        const semester = String(kelas.semester).toUpperCase();
        const selectedKelasStr = String(selectedKelas).toUpperCase();
        const selectedSemesterStr = String(selected.value).toUpperCase();

        return (
          kelasNumber === selectedKelasStr && semester === selectedSemesterStr
        );
      });

      if (!kelasData) {
        toast.error("Kelas tidak ditemukan.");
        console.log("❌ Kelas tidak ditemukan:", {
          selectedKelas,
          selectedSemester,
        });
        return;
      }

      if (!kelasData.MemberKelas || kelasData.MemberKelas.length === 0) {
        toast.error("Tidak ada siswa di kelas ini.");
        return;
      }

      // Cetak hasil filter kelas
      console.log("📝 Filtered Kelas Data:", kelasData);

      // Setel daftar siswa berdasarkan kelas yang ditemukan
      setStudents(
        kelasData.MemberKelas.map((m: any) => ({
          value: m.StudentProfil,
          label: m.StudentProfil.nama,
        }))
      );

      toast.success("Data siswa berhasil dimuat.");
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      toast.error("Gagal mengambil siswa.");
    }
  };

  const handleSiswaChange = async (siswa: any) => {
    if (!siswa || !siswa.value || !siswa.value.id) {
      toast.error("Siswa tidak valid.");
      return;
    }

    setSelectedSiswa(siswa.value);
    setMapelOptions([]);

    try {
      const mapelList: { id: number; namaMapel: string }[] = [];

      siswa.value.MemberKelas.forEach((memberKelas: any) => {
        if (
          memberKelas.Kelas &&
          memberKelas.Kelas.semester === selectedSemester
        ) {
          memberKelas.Kelas.MapelKelas.forEach((mapel: any) => {
            mapelList.push({
              id: mapel.id,
              namaMapel: mapel.Mapel.namaMapel,
            });

            if (mapel.nilai.length > 0) {
              setNilaiMapel((prev) => ({
                ...prev,
                [mapel.id]:
                  mapel.nilai.find(
                    (n: any) => n.studentProfilId === siswa.value.id
                  )?.skor || 0,
              }));
            }
          });
        }
      });

      setMapelOptions(mapelList);
    } catch (error) {
      toast.error("Gagal mengambil mata pelajaran.");
    }
  };

  const handleNilaiChange = (mapelId: number, skor: number) => {
    setNilaiMapel((prev) => ({
      ...prev,
      [mapelId]: skor,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedSiswa || !selectedSiswa.id) {
      toast.error("Pilih siswa terlebih dahulu.");
      return;
    }

    try {
      setIsSubmitting(true);

      const nilaiToSend = Object.entries(nilaiMapel).map(([mapelId, skor]) => ({
        studentProfileId: selectedSiswa.id,
        mapelKelasId: Number(mapelId),
        skor: skor,
      }));

      await Promise.all(
        nilaiToSend.map((nilai) =>
          postNilaiSiswa(nilai.studentProfileId, nilai.mapelKelasId, nilai.skor)
        )
      );
      toast.success("Nilai berhasil disimpan.");
    } catch (error) {
      toast.error("Gagal menyimpan nilai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tambah Nilai Siswa
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : (
          <>
            <Select
              options={[
                { value: "SMA", label: "SMA" },
                { value: "SMK", label: "SMK" },
              ]}
              onChange={handleSekolahChange}
              placeholder="Pilih Sekolah"
              className="mb-4"
            />
            {selectedSekolah === "SMK" && (
              <Select
                options={jurusanOptions}
                onChange={handleJurusanChange}
                placeholder="Pilih Jurusan"
                className="mb-4"
              />
            )}
            {selectedJurusan !== null && (
              <Select
                options={kelasOptions}
                onChange={handleKelasChange}
                placeholder="Pilih Kelas"
                className="mb-4"
              />
            )}
            {selectedKelas && (
              <Select
                options={semesterOptions}
                onChange={handleSemesterChange}
                placeholder="Pilih Semester"
                className="mb-4"
              />
            )}
            {students.length > 0 && (
              <Select
                options={students}
                onChange={handleSiswaChange}
                placeholder="Pilih Siswa"
                className="mb-4"
              />
            )}
            {mapelOptions.length > 0 && (
              <table className="w-full bg-gray-50 shadow-md rounded-lg mt-4">
                <tbody>
                  {mapelOptions.map((mapel) => (
                    <tr key={mapel.id} className="border-b">
                      <td className="p-2">{mapel.namaMapel}</td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={nilaiMapel[mapel.id] ?? ""}
                          onChange={(e) =>
                            handleNilaiChange(mapel.id, Number(e.target.value))
                          }
                          className="p-1 border rounded-md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Nilai"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
