"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import CategoryCard from "@/app/components/CategoryCard";

export default function PetaDetail() {
  const params = useParams();
  const [provinceName, setProvinceName] = useState("");
  const category = [
    {
      name: "Tradisi",
      background: "bg-gray-400",
      image: "https://i.imgur.com/PEioGSP.jpeg",
    },
    {
      name: "Budaya",
      background: "bg-blue-400",
      image: "https://i.imgur.com/hawnOUf.jpeg",
    },
    {
      name: "Seni",
      background: "bg-orange-400",
      image: "https://i.imgur.com/BkFNEew.jpeg",
    },
    {
      name: "Kuliner",
      background: "bg-yellow-400",
      image: "https://i.imgur.com/kB3DQxh.jpeg",
    },
    {
      name: "Musik",
      background: "bg-rose-400",
      image: "https://i.imgur.com/Qdl8YDe.jpeg",
    },
    {
      name: "Tarian",
      background: "bg-green-400",
      image: "https://i.imgur.com/PlGgQDR.jpeg",
    },
  ];

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const fetchProvince = async () => {
    try {
      const response = await fetch("https://budaya-karya-kita-backend.vercel.app/province", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: params.id, // Ensure the correct parameter is used
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setProvinceName(capitalizeWords(jsonResponse.province_name));
      } else {
        console.error("Failed to fetch:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProvince();
  });

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className=" flex flex-col w-full h-full px-12 mt-32">
        <div className="text-5xl">
          {provinceName ? <div>{provinceName}</div> : <div>Loading...</div>}
        </div>
        <div className="flex h-full justify-between mt-12">
          {category.map((value, index) => (
            <CategoryCard
              key={index}
              name={value.name}
              background={value.background}
              image={value.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
