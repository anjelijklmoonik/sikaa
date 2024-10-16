const getKeuangan = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/keuangan/${studentId}`)
    const data = await respond.json();
    return data;
}

export default getKeuangan;