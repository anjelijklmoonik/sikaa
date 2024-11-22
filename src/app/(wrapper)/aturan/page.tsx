import { NextPage } from "next";

const Aturan: NextPage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-[#f5f5dc] bg-opacity-20">
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 ml-64 p-4">
          <div className="bg-[#fcce7e] p-1 mt-1 mb-1 w-auto max-w-max mx-auto shadow-xl rounded-xl border border-gray-400 border-dashed">
            <h1 className="text-lg font-bold text-center">ATURAN</h1>
          </div>
          <div className="bg-[#fcce7e] p-4 shadow-lg mt-5">
            <p>
              1. <br />
              2. <br />
              3. <br />
              4. <br />
              5. <br />
              6. <br />
              7. <br />
              8. <br />
              9. <br />
              10.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Aturan;
