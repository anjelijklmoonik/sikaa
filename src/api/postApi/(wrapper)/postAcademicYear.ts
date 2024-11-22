const addAcademicYear = async (newAcademicYear:{year: string; studentProfilId: number}) => {
    const respond = await fetch ('http://localhost:3001/academicYear', {
        method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(newAcademicYear),
    });
    if (!respond.ok) {
        throw new Error("Gagal menambahkan tahun akademik yang baru")
    };

    const data = await respond.json();
    console.log("Tahun akademik berhasil dibuat");
    return data;
}

export default addAcademicYear;