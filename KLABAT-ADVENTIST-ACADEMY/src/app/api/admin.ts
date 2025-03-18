import axios from "axios";
import { getSession } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllStudentsCount = async () => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
      return { SMA: 0, SMK: 0 };
    }

    console.log(
      "🔍 Fetching data from:",
      `${API_URL}/admin/student-profile/count`
    );
    console.log("🔑 Using token:", token);

    const response = await axios.get(`${API_URL}/admin/student-profile/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ API Response:", response.data);
    return response.data.data; // Pastikan ini sesuai dengan format API
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    return { SMA: 0, SMK: 0 };
  }
};

export const postKeuangan = async (data: any) => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
    }

    console.log("🔍 Fetching data from:", `${API_URL}/finances`);
    console.log("🔑 Using token:", token);

    const response = await axios.post(`${API_URL}/finances`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Submit Keuangan Failed:", error);
    throw error;
  }
};

export const getKeuangan = async () => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
    }

    console.log("🔍 Fetching data from:", `${API_URL}/finances`);
    console.log("🔑 Using token:", token);

    const response = await axios.get(`${API_URL}/finances`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("getall Keuangan Failed:", error);
    throw error;
  }
};

export const postStudentProfile = async (data: any) => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
    }

    console.log("🔍 Fetching data from:", `${API_URL}/admin/student-profile`);
    console.log("🔑 Using token:", token);

    const response = await axios.post(`${API_URL}/admin/student-profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Submit Student Profile Failed:", error);
    throw error;
  }
};
export const getAllStudents = async () => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
      return []; // Pastikan selalu mengembalikan array
    }

    console.log(
      "🔍 Fetching student data from:",
      `${API_URL}/admin/student-profile`
    );

    const response = await axios.get(`${API_URL}admin/student-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pastikan `data.data` ada dan berbentuk array sebelum dikembalikan
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("❌ Data siswa tidak dalam format array:", response.data);
      return []; // Jika data tidak dalam format array, kembalikan array kosong
    }
  } catch (error) {
    console.error("❌ Gagal mengambil data siswa:", error);
    return []; // Return array kosong jika terjadi error
  }
};

export const postAchivement = async (data: any) => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
    }

    console.log("🔍 Fetching data from:", `${API_URL}/achievements`);
    console.log("🔑 Using token:", token);

    const response = await axios.post(`${API_URL}/achievements`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Submit Achievement Failed:", error);
    throw error;
  }
};
export const getAchievements = async () => {
  try {
    const { token } = getSession();

    if (!token) {
      console.error("❌ No token found!");
      return [];
    }

    console.log("🔍 Fetching data from:", `${API_URL}/achievements`);

    const response = await axios.get(`${API_URL}/achievements`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Fetch Achievements Failed:", error);
    return [];
  }
};

export const getCurrentUser = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(`${API_URL}/auth/whoami`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw error;
  }
};

export const getJurusanDanKelas = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(`${API_URL}/grades/form`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data:", error);
    throw error;
  }
};

export const postNilaiSiswa = async (
  studentProfileId: number,
  mapelKelasId: number,
  skor: number
) => {
  try {
    const { token } = getSession();
    const response = await axios.post(
      `${API_URL}grades`,
      { studentProfileId, mapelKelasId, skor },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("✅ Nilai berhasil ditambahkan:", response.data);
  } catch (error) {
    console.error("❌ Gagal menambahkan nilai:", error);
  }
};

export const getAttendanceForm = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(`${API_URL}/attendances/form`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Gagal mengambil data:", error);
    throw error;
  }
};


export const postAttendance = async (
  tanggal: string,
  status: string,
  studentProfileId: number,
  mapelKelasId: number,
  memberKelasId: number
) => {
  try {
    const { token } = getSession();
    const response = await axios.post(
      `${API_URL}attendances`,
      { tanggal, status, memberKelasId ,studentProfileId, mapelKelasId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Absen berhasil ditambahkan:", response.data);
  } catch (error) {
    console.error("Gagal menambahkan Absen:", error);
  }
};
