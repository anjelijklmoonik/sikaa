"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
import { getAttendanceForm, postAttendance } from "@/app/api/admin";
import { Toaster, toast } from "react-hot-toast";

export default function AbsenSiswa() {
  const [kelasOptions, setKelasOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedSekolah, setSelectedSekolah] = useState<string | null>(null);
  const [selectedJurusan, setSelectedJurusan] = useState<number | null>(null);
  const [selectedKelas, setSelectedKelas] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [students, setStudents] = useState<{ value: any; label: string }[]>([]);
  const [selectedSiswa, setSelectedSiswa] = useState<any | null>(null);
  const [mapelOptions, setMapelOptions] = useState<{ id: number; namaMapel: string }[]>([]);
  const [absensi, setAbsensi] = useState<{ [mapelId: number]: { tanggal: string; status: string } }>({});
  const [isSubmitting, setIsSubmitting] = useState<{ [mapelId: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

  const jurusanOptions = [
    { value: 2, label: "Layanan Kesehatan" },
    { value: 3, label: "Akuntasi Keuangan Lembaga" },
  ];
  const semesterOptions = [
    { value: "GANJIL", label: "GANJIL" },
    { value: "GENAP", label: "GENAP" },
  ];

  const statusOptions = [
    { value: "Hadir", label: "Hadir" },
    { value: "Izin", label: "Izin" },
    { value: "Sakit", label: "Sakit" },
    { value: "Alpa", label: "Alpa" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAttendanceForm();
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
      const response = await getAttendanceForm();
      console.log("📥 API Response:", response);
      const data = response?.data || response;

      const jurusanData = data.find((j: any) => j.id === selectedJurusan);
      if (!jurusanData) return toast.error("Jurusan tidak ditemukan.");

      const kelasData = jurusanData.Kelas.find(
        (k: any) => k.noKelas === selectedKelas && k.semester === selected.value
      );
      if (!kelasData) return toast.error("Kelas tidak ditemukan.");

      if (kelasData.MemberKelas.length === 0)
        return toast.error("Tidak ada siswa di kelas ini.");

      setStudents(
        kelasData.MemberKelas.map((m: any) => ({
          value: m.StudentProfil,
          label: m.StudentProfil.nama,
        }))
      );
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      toast.error("Gagal mengambil siswa.");
    }
  };

  const handleSiswaChange = async (selected: any) => {
    setSelectedSiswa(selected?.value || null);
    setMapelOptions([]);
    try {
      const mapelList: { id: number; namaMapel: string }[] = [];

      // Cek apakah ada Mapel pada StudentProfil
      if (selected?.value?.Mapel && Array.isArray(selected.value.Mapel)) {
        selected.value.Mapel.forEach((mapel: any) => {
          mapelList.push({
            id: mapel.id,
            namaMapel: mapel.namaMapel,
          });
        });
      }

      setMapelOptions(mapelList);
    } catch (error) {
      toast.error("Gagal mengambil data mapel.");
    }
  };

  const handleAbsensiChange = (mapelId: number, field: "tanggal" | "status", value: string) => {
    setAbsensi((prev) => ({
      ...prev,
      [mapelId]: {
        ...prev[mapelId],
        [field]: value,
      },
    }));
  };
  const handleSubmit = async (mapelId: number) => {
    if (!selectedSiswa || !selectedSiswa.id || !absensi[mapelId]?.tanggal || !absensi[mapelId]?.status) {
      toast.error("Pilih tanggal dan status sebelum menyimpan.");
      return;
    }
  
    try {
      setIsSubmitting((prev) => ({ ...prev, [mapelId]: true }));
  
      const dataToSend = {
        tanggal: formatDateToYYYYMMDD(absensi[mapelId].tanggal),
        status: absensi[mapelId].status,
        studentProfileId: selectedSiswa.id,
        mapelKelasId: mapelId,
        memberKelasId: selectedSiswa.MemberKelas[0]?.id || null,
      };
  
      await postAttendance(
        dataToSend.tanggal,
        dataToSend.status,
        dataToSend.studentProfileId,
        dataToSend.mapelKelasId,
        dataToSend.memberKelasId
      );
  
      toast.success(`Absensi berhasil disimpan.`);
    } catch (error) {
      toast.error("Gagal menyimpan absensi.");
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [mapelId]: false }));
    }
  };

  const formatDateToYYYYMMDD = (date: string): string => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tambah Absensi Siswa
        </h1>

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
        <Select
          options={kelasOptions}
          onChange={handleKelasChange}
          placeholder="Pilih Kelas"
          className="mb-4"
        />
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
          <>
            <table className="w-full bg-gray-50 shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Mata Pelajaran</th>
                  <th className="p-2">Tanggal</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mapelOptions.map((mapel) => (
                  <tr key={mapel.id}>
                    <td className="p-2">{mapel.namaMapel}</td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={absensi[mapel.id]?.tanggal || ""}
                        onChange={(e) =>
                          handleAbsensiChange(
                            mapel.id,
                            "tanggal",
                            e.target.value
                          )
                        }
                        className="p-1 border rounded-md"
                      />
                    </td>
                    <td className="p-2">
                      <Select
                        options={statusOptions}
                        value={statusOptions.find(
                          (o) => o.value === absensi[mapel.id]?.status
                        )}
                        onChange={(selected) =>
                          handleAbsensiChange(
                            mapel.id,
                            "status",
                            selected?.value || "Hadir"
                          )
                        }
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleSubmit(mapel.id)}
                        className={`px-4 py-2 rounded ${
                          isSubmitting[mapel.id] ? "bg-gray-400" : "bg-blue-500"
                        } text-white`}
                        disabled={isSubmitting[mapel.id]}
                      >
                        {isSubmitting[mapel.id] ? "Menyimpan..." : "Simpan"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
