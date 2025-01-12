"use client";

import Header from "@/app/components/Header";
import Post from "@/app/components/Post";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ForumDetail() {
  // const dummyData = [
  //   {
  //     id: 1,
  //     username: "@user1",
  //     bio: "Bio 1",
  //     profile: "https://i.imgur.com/NprMOWR.jpeg",
  //     caption: "Foto bersama ondel-ondel di Jakarta hari Sabtu lalu 👨‍👩‍👧‍👦🔥",
  //   },
  //   {
  //     id: 2,
  //     username: "@user2",
  //     bio: "Bio 2",
  //     caption: "Menikmati kuliner khas Bandung 🍜🍲",
  //   },
  //   {
  //     id: 3,
  //     username: "@user3",
  //     bio: "Bio 3",
  //     caption: "Liburan ke Bali dengan keluarga 🏖️🌴",
  //   },
  //   {
  //     id: 4,
  //     username: "@user4",
  //     bio: "Bio 4",
  //     caption: "Menyaksikan pertunjukan wayang kulit di Yogyakarta 🎭",
  //   },
  //   {
  //     id: 5,
  //     username: "@user5",
  //     bio: "Bio 5",
  //     caption: "Berburu batik di Solo 🧵",
  //   },
  // ];

  interface PostData {
    id: string;
    username: string;
    user_id: string;
    caption: string;
    profile: string;
    image: string;
  }

  const [forumData, setForumData] = useState<PostData | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchForumData = async () => {
      try {
        const response = await fetch(
          `https://budaya-karya-kita-backend.vercel.app/forum/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch forum data");
        }

        if (response.ok) {
          const jsonResponse = await response.json();
          setForumData(jsonResponse);
        } else {
          console.error(
            "Failed to fetch:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching forum data:", error);
      }
    };

    fetchForumData();
  }, [params.id]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow px-4 sm:px-0">
        {forumData ? (
          <div className="flex border border-gray-200 w-[1000px] h-[520px] rounded-md overflow-hidden shadow-md">
            <div className="w-1/2 bg-gray-300 relative">
              <Image src={forumData.image} alt="" fill={true} objectFit="cover" />
            </div>
            <div className="py-2 pl-8">
              <Post
                key={forumData.id}
                username={forumData.username}
                profile={forumData.profile}
                caption={forumData.caption}
              />
            </div>
          </div>
        ) : (
          <div className="text-3xl font-medium">Post not found</div>
        )}
      </div>
    </div>
  );
}
