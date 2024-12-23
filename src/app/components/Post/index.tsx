interface PostProps {
  username: string;
  bio: string;
  caption: string;
}

export default function Post({ username, bio, caption }: PostProps) {
  return (
    <div className="w-[420px] h-[120px]">
      <div className="flex items-center p-1 mb-4">
        <div
          className="w-[45px] h-[45px] rounded-full 
                    inline-flex items-center justify-center 
                    bg-gray-500 text-gray-700 mr-2"
        ></div>
        <div className="flex-col">
          <div className="flex text-lg">{username}</div>
          <div className="flex text-base">{bio}</div>
        </div>
      </div>
      {caption}
    </div>
  );
}
