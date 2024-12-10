const postAbsensi = async (absensiData: {
    tanggal: string;
    status: string;
    memberKelasId: number;
    studentId: number;
  }) => {
    const response = await fetch('http://localhost:3001/absensi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(absensiData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create Absensi');
    }
  
    return response.json();
  };
  
  export default postAbsensi;
  