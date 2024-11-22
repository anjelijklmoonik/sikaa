"use client";

import { useState } from "react";

type MataPelajaranType = {
  mataPelajaran: string;
  nilai: number;
};

type SemesterType = {
  semester: number;
  mataPelajaran: MataPelajaranType[];
  expanded: boolean;
};

const Nilai = () => {
  // Data semester ditentukan di sini, tetapi mata pelajaran dan nilai kosong
  const [semesterData, setSemesterData] = useState<SemesterType[]>([
    { semester: 1, mataPelajaran: [], expanded: false },
    { semester: 2, mataPelajaran: [], expanded: false },
    { semester: 3, mataPelajaran: [], expanded: false },
    { semester: 4, mataPelajaran: [], expanded: false },
    { semester: 5, mataPelajaran: [], expanded: false },
    { semester: 6, mataPelajaran: [], expanded: false },
  ]);

  const handleExpand = (index: number) => {
    setSemesterData((prevData) =>
      prevData.map((semester, idx) =>
        idx === index ? { ...semester, expanded: !semester.expanded } : semester
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      {/* Content Wrapper */}
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 ml-64 p-4">
          <h1 className="text-lg font-bold text-center">Nilai Semester</h1>

          <div className="mt-5">
            {semesterData.map((semester, index) => (
              <div key={index} className="mb-4">
                <div
                  className="cursor-pointer bg-[#fcce7e] p-3 rounded-lg shadow-md"
                  onClick={() => handleExpand(index)}
                >
                  Semester {semester.semester}
                </div>
                {semester.expanded && (
                  <div className="p-4 bg-gray-100 rounded-b-lg shadow-md">
                    {semester.mataPelajaran.length > 0 ? (
                      <ul>
                        {semester.mataPelajaran.map((mapel, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{mapel.mataPelajaran}</span>
                            <span>{mapel.nilai}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">
                        Belum ada data mata pelajaran.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nilai;
