import Header from "../components/Header";
import Post from "../components/Post";

const dummyData = [
  {
    username: "@user1",
    bio: "Bio 1",
    caption: "Foto bersama ondel-ondel di Jakarta hari Sabtu lalu 👨‍👩‍👧‍👦🔥",
  },
  {
    username: "@user2",
    bio: "Bio 2",
    caption: "Menikmati kuliner khas Bandung 🍜🍲",
  },
  {
    username: "@user3",
    bio: "Bio 3",
    caption: "Liburan ke Bali dengan keluarga 🏖️🌴",
  },
  {
    username: "@user4",
    bio: "Bio 4",
    caption: "Menyaksikan pertunjukan wayang kulit di Yogyakarta 🎭",
  },
  {
    username: "@user5",
    bio: "Bio 5",
    caption: "Berburu batik di Solo 🧵",
  },
];

export default function Forum() {
  return (
    <div className="h-screen flex flex-col overflow-auto">
      <Header />
      <div className="flex flex-col items-center gap-6 px-4 mb-6 sm:px-0">
        {dummyData.map((post, index) => (
          <div
            key={index}
            className="w-full max-w-md sm:max-w-2xl rounded-lg border border-gray-200 overflow-hidden bg-white shadow-md"
          >
            <div className=" bg-gray-300 h-[500] w-full"></div>
            <div className="p-4">
              <Post username={post.username} bio={post.bio} caption={post.caption} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}