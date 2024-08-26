import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="bg-green-500 p-2">
        <div className="flex flex-row gap-x-5 items-center">
          <Image
            src={"/icon.png"}
            alt="logo.png"
            width={100}
            height={100}
            className="bg-red-500"
          />
          <div>
            <h1>SMA-SMK ADVENT KLABAT MANADO</h1>
            <h2>SMABAT SETIA</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
