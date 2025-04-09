import Cookies from "js-cookie";

// Simpan sesi ke dalam cookies
export const setSession = (token: string, role: string) => {
  Cookies.set("token", token, { expires: 1, path: "/" }); // Expire dalam 1 hari
  Cookies.set("role", role, { expires: 1, path: "/" });
  console.log("Session saved in cookies:", { token, role });
};

// Ambil sesi dari cookies
export const getSession = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  console.log("Session fetched from cookies:", { token, role });
  return { token, role };
};

// Hapus sesi dari cookies
export const clearSession = () => {
  Cookies.remove("token", { path: "/" });
  Cookies.remove("role", { path: "/" });
  console.log("Session cleared: token and role removed from cookies.");
};
