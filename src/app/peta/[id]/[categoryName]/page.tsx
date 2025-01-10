"use client";
import Header from "@/app/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Indonesia from "@/app/components/indonesia-prov.json";

export default function Test() {
  const router = useRouter();
  const params = useParams();

  interface Culture {
    title: string;
    name: string;
    description: string;
    province_name: string;
  }

  const [cultureData, setCultureData] = useState<Culture[]>([]);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/culture/${params.id}/${params.categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
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
  }, [params.id, params.categoryId]);

  const feature = Indonesia.features.find(
    (f) => f.properties.ID === Number(params.id)
  );
  const provinceName = feature?.properties.Propinsi;

  return (
    <div>
      <Header />
      <div>{provinceName}</div>
      <div
        className="flex flex-col sm:flex-row gap-8 mt-12 mb-12 w-full flex-wrap "
        onClick={() => router.back()}
      >
        {cultureData.length > 0 ? (
          cultureData.map((item, index) => (
            <div key={index} className="border rounded-lg w-[430px] h-[400px]">
              <div>{item.name}</div>
              <div>{item.description}</div>
            </div>
          ))
        ) : (
          <div>Tidak ada data</div>
        )}
      </div>
    </div>
  );
}
