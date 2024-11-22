"use client";

import { useState } from "react";

type SemesterType = {
  semester: number;
  expanded: boolean;
};

const Absen = () => {
  const [semesterData, setSemesterData] = useState<SemesterType[]>([
    { semester: 1, expanded: false },
    { semester: 2, expanded: false },
    { semester: 3, expanded: false },
    // More semesters can be added similarly
  ]);

  const handleExpand = (index: number) => {
    const updatedData = semesterData.map((semester, idx) => {
      if (index === idx) {
        return { ...semester, expanded: !semester.expanded };
      }
      return semester;
    });
    setSemesterData(updatedData);
  };

  return (
    <main className="min-h-screen bg-[#f5f5dc] bg-opacity-20 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 ml-64 p-4">
        <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
          <h1 className="text-lg font-bold text-center">ABSENSI</h1>
        </div>

        {/* Main Content */}
        <div className="mt-5 bg-white">
          <table className="w-full bg-white border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-gray-300">Semester</th>
              </tr>
            </thead>
            <tbody>
              {semesterData.map((item, index) => (
                <>
                  <tr
                    key={index}
                    className="cursor-pointer text-center hover:bg-gray-100"
                    onClick={() => handleExpand(index)}
                  >
                    <td className="p-3 border-b border-gray-300">
                      Semester {item.semester}
                    </td>
                  </tr>
                  {item.expanded && (
                    <tr>
                      <td className="p-3 border-b border-gray-300">
                        <p className="text-center text-gray-500">
                          Tidak ada mata pelajaran dan absensi yang diisi oleh
                          admin.
                        </p>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Absen;
