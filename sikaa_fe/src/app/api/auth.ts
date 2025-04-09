import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Login untuk Admin
export const loginAdmin = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/admin/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error;
  }
};

// Login untuk Siswa
export const loginStudent = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/student/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Student login failed:", error);
    throw error;
  }
};

// Login untuk Orang Tua
export const loginParent = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/ortu/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Parent login failed:", error);
    throw error;
  }
};


