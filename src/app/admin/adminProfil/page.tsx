"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import addProfil from "@/api/postApi/(wrapper)/postProfil";
import addAcademicYear from "@/api/postApi/(wrapper)/postAcademicYear";
import addClass from "@/api/postApi/(wrapper)/postKelas";
import getProfil from "@/api/getApi/(wrapper)/getProfil";
import getAcademicYear from "@/api/getApi/(wrapper)/getAcademicYear";
import getKelas from "@/api/getApi/(wrapper)/getKelas";

interface Student {
  studentId: string;
  foto: string;
  nama: string;
  noIndukSiswa: string;
  sekolah: string;
  kelas: string;
  jurusan: string;
  alamat: string;
  ttl: string;
  agama: string;
  jenisKelamin: string;
  noTelp: string;
  email: string;
  namaAyah: string;
  namaIbu: string;
  noTelpAyah: string;
  noTelpIbu: string;
  namaWali: string;
  noTelpWali: string;
  academicYear: string;
}

const AdminProfilPage = () => {
  const queryClient = useQueryClient();

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const [studentProfile, setStudentProfile] = useState<Student>({
    foto: "",
    nama: "",
    noIndukSiswa: "",
    sekolah: "",
    kelas: "",
    jurusan: "",
    alamat: "",
    ttl: "",
    noTelp: "",
    email: "",
    namaAyah: "",
    namaIbu: "",
    noTelpAyah: "",
    noTelpIbu: "",
    namaWali: "",
    noTelpWali: "",
    jenisKelamin: "",
    agama: "",
    academicYear: "",
    studentId: "",
  });

  const [newAcademicYear, setNewAcademicYear] = useState<string>("");
  const [newClassName, setNewClassName] = useState<string>("");

  const { data: years } = useQuery({
    queryKey: ["academicYear"], // This is the query key used to cache the results
    queryFn: async ({ queryKey }) => {
      // The context provides the queryKey, signal, etc.
      const response = await getAcademicYear(students);
      return response; // Make sure getAcademicYear returns a valid response
    },
  });

  // Fetch classes based on the selected year
  const { data: classes } = useQuery({
    queryKey: ["classes", selectedYear],
    queryFn: () => getKelas(selectedYear!),
    enabled: !!selectedYear,
  });

  // Assuming getProfil can accept the query context correctly
  const { data: students } = useQuery({
    queryKey: ["students", selectedClass],
    queryFn: ({ queryKey }) => getProfil(queryKey[1] as string), // Accessing class from queryKey
    enabled: !!selectedClass,
  });

  // Mutations for adding data
  const mutationAddProfil = useMutation({
    mutationFn: addProfil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profiles"] });
    },
  });

  const mutationAddAcademicYear = useMutation({
    mutationFn: addAcademicYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const mutationAddClassToYear = useMutation({
    mutationFn: (variables: { year: string; className: string }) =>
      addClassToYearApi(variables.year, variables.className),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes", selectedYear] });
    },
  });

  function handleSelectYear(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedYear(event.target.value);
    setSelectedClass(null); // Reset class and student selection when year changes
    setSelectedStudent(null);
  }

  const handleSelectClass = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
    setSelectedStudent(null); // Reset student selection when class changes
  };

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudent(studentId);
    const student = students?.find(
      (s: { studentId: string }) => s.studentId === studentId
    );
    if (student) {
      setStudentProfile(student);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStudentProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (selectedStudent && studentProfile) {
      try {
        await mutationAddProfil.mutateAsync(studentProfile);
        setStudentProfile({
          foto: "",
          nama: "",
          noIndukSiswa: "",
          sekolah: "",
          kelas: "",
          jurusan: "",
          alamat: "",
          ttl: "",
          noTelp: "",
          email: "",
          namaAyah: "",
          namaIbu: "",
          noTelpAyah: "",
          noTelpIbu: "",
          namaWali: "",
          noTelpWali: "",
          jenisKelamin: "",
          agama: "",
          academicYear: "",
          studentId: "",
        });
      } catch (error) {
        console.error("Failed to save profile:", error);
      }
    }
  };

  const handleAddAcademicYear = async () => {
    if (newAcademicYear) {
      try {
        await mutationAddAcademicYear.mutateAsync({
          year: newAcademicYear,
          studentProfilId: 0,
        });
        setNewAcademicYear(""); // Reset input field
      } catch (error) {
        console.error("Failed to add academic year:", error);
      }
    }
  };

  const handleAddClassToYear = async () => {
    if (newClassName && selectedYear) {
      try {
        await mutationAddClassToYear.mutateAsync({
          year: selectedYear,
          className: newClassName,
        });
        setNewClassName(""); // Reset input field
      } catch (error) {
        console.error("Failed to add class:", error);
      }
    }
  };

  return (
    <div className="text-center">
      <h1>Admin - Manage Student Profile</h1>

      <div>
        <label htmlFor="academic-year">Select Academic Year:</label>
        <select
          id="academic-year"
          value={selectedYear || ""}
          onChange={handleSelectYear}
        >
          <option value="">Select Year</option>
          {Array.isArray(years) &&
            years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="new-academic-year">Add New Academic Year:</label>
        <input
          type="text"
          id="new-academic-year"
          value={newAcademicYear}
          onChange={(e) => setNewAcademicYear(e.target.value)}
          placeholder="Enter new academic year"
        />
        <button onClick={handleAddAcademicYear}>Add Year</button>
      </div>

      {selectedYear && (
        <div>
          <label htmlFor="class">Select Class:</label>
          <select
            id="class"
            value={selectedClass || ""}
            onChange={handleSelectClass}
          >
            <option value="">Select Class</option>
            {Array.isArray(classes) &&
              classes.map((classItem) => (
                <option key={classItem} value={classItem}>
                  {classItem}
                </option>
              ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="new-class">Add New Class:</label>
        <input
          type="text"
          id="new-class"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Enter new class name"
        />
        <button onClick={handleAddClassToYear}>Add Class</button>
      </div>

      {selectedClass && (
        <div>
          <h2>Students in {selectedClass}:</h2>
          {Array.isArray(students) &&
            students.map((student) => (
              <button
                key={student.studentId}
                onClick={() => handleSelectStudent(student.studentId)}
              >
                {student.nama}
              </button>
            ))}
        </div>
      )}

      {selectedStudent && (
        <div>
          <h2>Student Profile:</h2>
          <form>
            <input
              type="text"
              name="nama"
              value={studentProfile.nama}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="noIndukSiswa"
              value={studentProfile.noIndukSiswa}
              onChange={handleInputChange}
              placeholder="Student ID"
            />
            {/* Add other form inputs here as needed */}
            <button onClick={handleSaveProfile}>Save Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProfilPage;
function addClassToYearApi(year: string, className: string): Promise<unknown> {
  throw new Error("Function not implemented.");
}
