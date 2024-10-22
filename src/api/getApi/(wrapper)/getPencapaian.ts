import { error } from "console";

const getPencapaian = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/pencapaian/${studentId}`);
    if (!respond.ok) {
        throw new Error("Error mengambil data Pencapaian");
    }
    const data = await respond.json();
    console.log("Data dari Backend:", data);
    return data;
}

export default getPencapaian;