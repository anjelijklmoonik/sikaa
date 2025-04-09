import { getSession } from "@/utils/cookies";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getNilaiParents = async () => {
    try {
      const { token } = getSession();
      const response = await axios.get(
        `${API_URL}/grades/parent
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

  export const getAbsenParents = async () => {
    try {
      const { token } = getSession();
      const response = await axios.get(
        `${API_URL}/attendances/parent
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
  
  export const getKeuanganParents = async () => {
    try {
      const { token } = getSession();
      const response = await axios.get(
        `${API_URL}/finances/parent
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
  export const getParentAchievements = async () => {
    try {
      const { token } = getSession();
      const response = await axios.get(
        `${API_URL}/achievements/parent
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