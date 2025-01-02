import Link from "next/link";
import Header from "../components/Header";
import Post from "../components/Post";

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

export default function Forum() {
  return (
    <div className="h-screen flex flex-col overflow-auto">
      <Header />
      <div className="flex flex-col items-center gap-6 px-4 mb-6 sm:px-0 font-inter">
        {dummyData.map((post, index) => (
          <div
            key={index}
            className="w-full max-w-md sm:max-w-2xl rounded-lg border border-gray-200 overflow-hidden bg-white shadow-md"
          >
            <Link href= {`/forum/${post.id}`}
            >
              <div className="bg-gray-300 h-[500px] w-full">Ini Foto</div>
              <div className="p-4">
                <Post
                  username={post.username}
                  bio={post.bio}
                  caption={post.caption}
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
