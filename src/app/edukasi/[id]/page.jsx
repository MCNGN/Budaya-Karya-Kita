"use client";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EdukasiDetail() {
  const params = useParams();
  const [education, setEducation] = useState({});
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    async function importYoutubeLite() {
      await import("@justinribeiro/lite-youtube");
    }
    importYoutubeLite();
  }, []);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const response = await fetch(
          `https://budaya-karya-kita-backend.vercel.app/educations/${params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          setEducation(jsonResponse);
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

    const fetchCultureDetail = async () => {
      try {
        const response = await fetch(
          `https://budaya-karya-kita-backend.vercel.app/education`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          setEducations(jsonResponse);
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
    fetchCultureDetail();
  }, [params.id]);

  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <div className="px-12">
        <div className="text-xl ">Video</div>
        <div className="text-4xl font-medium mb-2">{education.title}</div>
        <div className="flex mb-4">
          <div className="flex flex-row w-[1800px] h-[703px] ">
            <div className="rounded-xl overflow-hidden h-[703px] w-[1250px] flex-none">
              <lite-youtube
                videoid={`${education.youtube}`}
                posterquality={"maxresdefault"}
              />
            </div>
          </div>
          <div className="flex flex-col ml-6 ">
            {educations.filter((item) => {return item.id != params.id}).map((item, index) => (
              <div key={index}>
                <Link href={`/edukasi/${item.id}`}>
                  <div className="flex flex-row h-[141px] hover:cursor-pointer mb-6">
                    <div className="flex-none rounded-lg border-black w-[250px] mr-2 overflow-hidden">
                      <Image
                        src={`${item.image}`}
                        alt=""
                        width={250}
                        height={141}
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="break-word mb-1">{item.title}</div>
                      <div>
                        <div className="break-word text-sm text-gray-500 line-clamp-4">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
