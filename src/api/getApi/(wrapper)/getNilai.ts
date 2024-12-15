const getNilai = async (studentId: string) => {
  const respond = await fetch(`http://localhost:3001/nilai/${studentId}`);
  const data: Data = await respond.json();
  return data;
};

type Data = {
  data: Record<
    string,
    {
      id: 1;
      skor: 90;
      pelajaran: "Matematika";
      memberKelasId: 1;
      MemberKelas: {
        Kelas: {
          semester: "GANJIL";
          AcademicYear: {
            year: 2020;
          };
        };
      };
    }[]
  >;
  message: "Nilai terbaca";
};

export default getNilai;
