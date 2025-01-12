"use client";

import Header from "@/app/components/Header";
import Post from "@/app/components/Post";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

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

  const params = useParams();
  const [forumData, setForumData] = useState<PostData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = () => {
      const userCookie = Cookies.get("isLoggedIn");
      if (userCookie) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

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
              <Image
                src={forumData.image}
                alt=""
                fill={true}
                objectFit="cover"
              />
            </div>
            <div className="py-2 pl-8 w-1/2 bg-red">
              <Post
                key={forumData.id}
                username={forumData.username}
                profile={forumData.profile}
                caption={forumData.caption}
              />
              <div className="relative">
                <div className="flex flex-row items-start px-4 w-full mb-4">
                  <div className="w-[30px] h-[30px] rounded-full inline-flex items-center justify-center bg-gray-500 text-gray-700 flex-shrink-0 mr-2 relative">
                    <Image
                      src={"https://i.imgur.com/nBk7ymi.jpeg"}
                      alt=""
                      width={45}
                      height={45}
                      className="shadow-xl border-black rounded-full"
                    />
                  </div>
                  <div className="break-word text-xs">
                    Test ini komen Test ini komen Test ini komen Test ini komen
                    Test ini komen Test ini komen Test ini komen Test ini komen
                    Test ini komen Test ini komen Test ini komen Test ini komen
                  </div>
                </div>

                {isLoggedIn && (
                  <div className="absolute top-80 left-0 w-full p-4 bg-white">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-7 flex items-center "
                    >
                      <div className="hover:text-gray-500">Post</div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-3xl font-medium">Post not found</div>
        )}
      </div>
    </div>
  );
}
