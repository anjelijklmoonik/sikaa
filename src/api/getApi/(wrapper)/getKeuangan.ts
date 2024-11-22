const getKeuangan = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/keuangan/${studentId}`);

    const data = await respond.json();
    console.log("Data dari Backend:", data);
    return data;
}

export default getKeuangan;