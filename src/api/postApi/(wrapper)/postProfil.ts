const addProfil = async (newProfil: {
    foto: string;
    nama: string; 
    noIndukSiswa: string; 
    sekolah: string; 
    kelas: string; 
    jurusan: string; 
    alamat: string; 
    ttl: string; 
    agama: string; 
    jenisKelamin: string; 
    noTelp: string; 
    email: string; 
    namaAyah: string; 
    namaIbu: string; 
    noTelpAyah: string; 
    noTelpIbu: string; 
    namaWali: string; 
    noTelpWali: string; 
    academicYear: string;}) => {
        const respond = await fetch('http://localhost:3001/keuangan', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(newProfil),
        });

        if (!respond.ok) {
            throw new Error("Gagal menambahkan profil baru");
        };
        const data = await respond.json();
        console.log("Profil baru berhasil ditambahkan:", data);
        return data;
    };
    
    export default addProfil;