import Header from "./components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center flex-auto px-4 sm:px-0">
        <div className="w-full max-w-md sm:max-w-2xl text-center font-inter">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warp mb-4">
            Kenali keanekaragaman budaya Indonesia
          </p>
          <p className="text-sm sm:text-base lg:text-lg mb-6 text-gray-500">
            Jelajahi kekayaan tradisi, budaya, seni, kuliner, musik, dan tarian
            dari Sabang sampai Merauke. Kenali, kembangkan, dan lestarikan ––
            mulai dari sini.
          </p>
        </div>

        <Link href='/peta' className="px-6 py-3 bg-black text-white rounded-full text-lg sm:text-xl">
          Mulai Sekarang &gt;
        </Link>
      </div>
    </div>
  );
}
