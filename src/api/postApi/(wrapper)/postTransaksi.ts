const postTransaksi = async (id: number, payload: any): Promise<any> => {
    const response = await fetch(`http://localhost:3001/keuangan/${id}/transaksi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Serialisasi data menjadi JSON
    });
  
    if (!response.ok) {
      throw new Error("Gagal membuat transaksi. Periksa input dan coba lagi.");
    }
  
    return response.json();
  };
  
  export default postTransaksi;
  