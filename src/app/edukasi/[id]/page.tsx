"use client";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useEffect } from "react";

export default function EdukasiDetail() {
  useEffect(() => {
    async function importYoutubeLite() {
      await import("@justinribeiro/lite-youtube");
    }
    importYoutubeLite();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <div className="px-12">
        <div className="text-xl ">Video</div>
        <div className="text-4xl mb-4 font-medium ">
          Resep soto Betawi ala rumah makan Jakarta
        </div>
        <div className="flex flex-row w-[1800px] h-[703px] ">
          <div className="rounded-xl overflow-hidden h-[703px] w-[1250px] flex-none">
            <lite-youtube
              videoid="YkZpAQ0AR0c"
              posterquality="maxresdefault"
            ></lite-youtube>
            {/* <iframe
              id="ytplayer"
              width="1250"
              height="703"
              src="https://www.youtube.com/embed/YkZpAQ0AR0c"
            ></iframe> */}
          </div>
          <div className="flex flex-col ml-6 overflow-scroll justify-between">
            <div className="flex flex-row h-[141px] hover:cursor-pointer">
              <div className="flex-none rounded-lg border-black w-[250px] mr-2 overflow-hidden">
                <Image
                  src={"https://i.ytimg.com/vi/YkZpAQ0AR0c/maxresdefault.jpg"}
                  alt=""
                  width={250}
                  height={141}
                />
              </div>
              <div className="flex flex-col overflow-hidden ">
                <div className="break-words mb-1">
                  Resep soto Betawi ala rumah makan Jakarta
                </div>
                <div className="break-words text-sm text-gray-500">
                  Resep soto Betawi ala rumah makan Jakarta yang diciptakan
                  khusus untuk memenuhi kebutuhan budidaya tulang muda dan
                  sekitarnya apalah
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
