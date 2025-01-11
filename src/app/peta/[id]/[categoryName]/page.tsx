"use client";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Indonesia from "@/app/components/indonesia-prov.json";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Test() {
  const router = useRouter();
  const params = useParams();

  interface Culture {
    title: string;
    image: string;
    description: string;
    province_name: string;
  }

  const [cultureData, setCultureData] = useState<Culture[]>([]);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const response = await fetch(
          `https://budaya-karya-kita-backend.vercel.app/culture/${params.id}/${params.categoryName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          setCultureData(jsonResponse);
        } else {
          console.error(
            "Failed to fetch:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCulture();
  }, [params.id, params.categoryName]);

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const feature = Indonesia.features.find(
    (f) => f.properties.ID === Number(params.id)
  );
  const provinceName = feature?.properties.Propinsi;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="px-12 h-full w-full">
        <div className="flex items-center text-base mb-4 w-[180px] hover:scale-110 hover:ml-2">
          <ChevronLeftIcon className="size-5 mr-1" />
          <div className="cursor-pointer" onClick={() => router.back()}>
            Kembali ke kategori
          </div>
        </div>
        <div className="text-4xl font-medium">
          {capitalizeWords(params.categoryName)} di {provinceName}
        </div>

        {cultureData.length > 0 ? (
          cultureData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-8 mt-12 mb-12 w-full flex-wrap"
            >
              <div
                key={index}
                className="shadow-xl border rounded-lg w-[430px] h-[550px] text-lg font-normal overflow-hidden"
              >
                <div>
                  <Image
                    src={item.image}
                    height={500}
                    width={500}
                    alt=""
                    className="shadow-md mb-4"
                  />
                </div>
                <div className="px-2 text-wrap ">
                  <div className="text-3xl mb-2 font-semibold">
                    {item.title}
                  </div>
                  <div className="text-gray-500">{item.description}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <div className="text-3xl text-gray-800 font-medium">
              Tidak ada data
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
