const getAbsen = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/absensi/${studentId}`)
    const data = await respond.json();
    return data;
}

export default getAbsen;