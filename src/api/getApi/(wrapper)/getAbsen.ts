const getAbsen = async (studentId:string) => {
    const respond = await fetch (`http://localhost:3001/absensi/${studentId}`)
    const data = await respond.json();
    return data;
}

export default getAbsen;

// const getAbsensi = async (studentId:string) => {
//     const response = await fetch(`http://localhost:3001/absensi/${studentId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch Absensi');
//     }
  
//     return response.json();
//   };
  
//   export default getAbsensi;
  