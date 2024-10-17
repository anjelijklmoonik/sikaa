const getNilai = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/nilai/${studentId}`)
    const data = await respond.json();
    return data;
}

export default getNilai;