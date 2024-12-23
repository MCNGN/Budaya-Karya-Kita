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
    <div>
      <Header />
      <div className="flex flex-col items-center gap-4 my-6">
        {dummyData.map((post, index) => (
          <div
            key={index}
            className="flex justify-stretch w-[740px] h-[258px] rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="w-1/3 bg-gray-300"></div>
            <div className="w-2/3 content-center bg-white py-2 pl-10">
              <Post username={post.username} bio={post.bio} caption={post.caption} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}