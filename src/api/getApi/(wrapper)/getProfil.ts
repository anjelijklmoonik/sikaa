const getProfil = async (studentId: string) => {
  const respond = await fetch(
    `http://localhost:3001/studentProfil/${studentId}`
  );
  const data = await respond.json();
  return data;
};

export default getProfil;
