import Header from "../components/Header";

export default function Edukasi() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center flex-auto px-4 ">
        <div>Pelajari dan coba berbagai kesenian</div>
        <div>
          <div className="flex flex-row h-[410px] w-[900px] bg-red-500">
            <div>Kolom 1</div>
            <div>Kolom 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
