import Image from "next/image";

interface Category {
  name: string;
  background: string;
  image: string;
}

export default function CategoryCard({ name, background, image }: Category) {
  return (
    <div className="flex hover:scale-110 transition-all">
      <div
        className={`flex flex-col w-[280px] h-[380px] justify-center items-center ${background} rounded-2xl font-medium shadow-xl`}
      >
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-xl ">
          <Image
            src={image}
            width={600}
            height={600}
             className="rounded-full aspect-square object-cover"
            alt=""
          />
        </div>
        <div className="mt-2 text-2xl">{name}</div>
      </div>
    </div>
  );
}
