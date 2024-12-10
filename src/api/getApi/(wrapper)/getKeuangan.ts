// const getKeuangan = async (studentId:string) => {
//     const respond = await fetch (`http://localhost:3001/keuangan/${studentId}`);

//     const data = await respond.json();
//     console.log("Data dari Backend:", data);
//     return data;
// }

// export default getKeuangan;

// src/api/getApi/(wrapper)/getKeuangan.ts
const getKeuangan = async (studentId: number): Promise<any> => {
    const response = await fetch(`http://localhost:3001/keuangan/${studentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch financial data.");
    }
  
    return response.json();
  };
  
  export default getKeuangan;
  