const getPencapaian = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/pencapaian/${studentId}`)
    const data = await respond.json();
    return data;
}

export default getPencapaian;