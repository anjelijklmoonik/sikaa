
import { getSession } from "@/utils/cookies";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAbsenStudents = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(
      `${API_URL}/attendances/student
      `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw error;
  }
};

export const getNilaiStudents = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(
      `${API_URL}/grades/student
      `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get nilai user:", error);
    throw error;
  }
};

export const upadateProfil = async (data: any) => {
  try {
    const { token } = getSession();
    const response = await axios.put(
      `${API_URL}/admin/student-profile/student`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get nilai user:", error);
    throw error;
  }
};

export const getKeuanganStudents = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(
      `${API_URL}/finances/student
      `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw error;
  }
}
export const getStudentAchievements = async () => {
  try {
    const { token } = getSession();
    const response = await axios.get(
      `${API_URL}/achievements/student
      `,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw error;
  }
}