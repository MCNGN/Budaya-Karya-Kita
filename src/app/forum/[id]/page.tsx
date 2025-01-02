"use client";

import Header from "@/app/components/Header";
import Post from "@/app/components/Post";

export default function Detail({ params }) {
  const dummyData = [
    {
      id: 1,
      username: "@user1",
      bio: "Bio 1",
      caption: "Foto bersama ondel-ondel di Jakarta hari Sabtu lalu 👨‍👩‍👧‍👦🔥",
    },
    {
      id: 2,
      username: "@user2",
      bio: "Bio 2",
      caption: "Menikmati kuliner khas Bandung 🍜🍲",
    },
    {
      id: 3,
      username: "@user3",
      bio: "Bio 3",
      caption: "Liburan ke Bali dengan keluarga 🏖️🌴",
    },
    {
      id: 4,
      username: "@user4",
      bio: "Bio 4",
      caption: "Menyaksikan pertunjukan wayang kulit di Yogyakarta 🎭",
    },
    {
      id: 5,
      username: "@user5",
      bio: "Bio 5",
      caption: "Berburu batik di Solo 🧵",
    },
  ];

  const { id } = params;


  const postData = dummyData.find((p) => p.id === parseInt(id));
  console.log(postData);

  return (
    <div>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <div className="flex border border-gray-400 w-[1000] h-[520] rounded-md overflow-hidden">
          <div className="w-1/2 bg-gray-300"></div>
          <div className="py-2 pl-8">
            <Post
              username={postData.username}
              bio={postData.bio}
              caption={postData.caption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
