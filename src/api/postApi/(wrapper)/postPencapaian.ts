const addPencapaian = async (newPencapaian: { judul: string; deskripsi: string; tanggal: string; studentProfilId: number }) => {
    const respond = await fetch('http://localhost:3001/pencapaian', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(newPencapaian),
    });

    if (!respond.ok) {
        throw new Error("Gagal menambahkan pencapaian baru");
    };

    const data = await respond.json();
    console.log("Data Pencapaian yang Berhasil ditambahkan:", data);
    return data;
}

export default addPencapaian;