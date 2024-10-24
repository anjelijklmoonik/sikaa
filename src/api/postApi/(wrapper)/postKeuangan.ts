const addKeuangan = async (newKeuangan: { lastTransDate: string; referensi: string; noJurnal: string; debit: string; kredit: string; total: string; deskripsi: string; studentProfilId: number}) => {
    const respond = await fetch('http://localhost:3001/keuangan', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(newKeuangan),
    });

    if (!respond.ok) {
        throw new Error("Gagal menambahkan data keuangan");
    }
    
    const data = await respond.json();
    console.log("Data Keuangan berhasil diinput:", data);
    return data;
}

export default addKeuangan;