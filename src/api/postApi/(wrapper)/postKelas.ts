const addClass = async (year: string, className: string) => {
    const response = await fetch("http://localhost:3001/kelas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year, className }),
    });
  
    if (!response.ok) {
      throw new Error("Gagal menambahkan Kelas.");
    }
  
    return await response.json();
  };
  
export default addClass;