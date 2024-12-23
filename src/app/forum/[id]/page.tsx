import Header from "@/app/components/Header";
import Post from "@/app/components/Post";

const dummyData = {
  username: "@user1",
  bio: "Bio 1",
  caption: "Foto bersama ondel-ondel di Jakarta hari Sabtu lalu 👨‍👩‍👧‍👦🔥",
};

export default function Detail() {
  return (
    <div>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <div className="flex border border-gray-400 w-[1000] h-[520] rounded-md overflow-hidden">
          <div className="w-1/2 bg-gray-300"></div>
          <div className="py-2 pl-8">
            <Post
              username={dummyData.username}
              bio={dummyData.bio}
              caption={dummyData.caption}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
