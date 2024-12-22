//
import Header from "../../components/Header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col justify-center items-center h-5/6">
        <div className="w-[768px]">
          <p className="text-7xl text-center mb-4">
            Kenali keanekaragaman budaya Indonesia
          </p>
          <p className="mb-4 text-center text-gray-500">
            Jelajahi kekayaan tradisi, budaya, seni, kuliner, musik, dan tarian
            dari Sabang sampai Merauke. Kenali, kembangkan, dan lestarikan ––
            mulai dari sini.
          </p>
        </div>

        <button className="px-4 py-2 bg-black text-white rounded-full">
          Mulai Sekarang &gt;
        </button>
      </div>
    </div>
  );
}
