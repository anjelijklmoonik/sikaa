const getKelas = async (year: string) => {
    const response = await fetch(`http://localhost:3001/kelas/${year}`);
    return await response.json();
  };

export default getKelas;