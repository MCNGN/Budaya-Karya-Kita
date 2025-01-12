import Image from "next/image";

interface PostProps {
  username: string;
  profile: string;
  caption: string;
}

export default function Post({ username, profile, caption }: PostProps) {
  return (
    <div className="w-full max-w-md sm:max-w-lg p-4">
      <div className="flex items-center mb-4">
        <div
          className="w-[45px] h-[45px] rounded-full 
                    inline-flex items-center justify-center 
                    bg-gray-500 text-gray-700 mr-2"
        >
          {profile && (
            <Image
              src={profile}
              alt={username}
              width={45}
              height={45}
              className="shadow-xl border-black rounded-full"
            />
          )}
        </div>
        <div className="flex-col">
          <div className="text-lg font-semibold">{username}</div>
        </div>
      </div>
      <div className="w-full break-words">{caption}</div>
    </div>
  );
}
