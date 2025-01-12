import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EducationCard({ currentIndex, shuffledItems }) {
  const router = useRouter()

  return (
    <div className="overflow-hidden w-full cursor-pointer">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {shuffledItems.map((item) => (
          <div
            key={item.id}
            className="flex-none w-full "
            style={{ width: "100%" }}
          >
            <div
              className="flex flex-col h-full w-full items-center"
              onClick={() => router.push(`/edukasi/${item.id}`)}
            >
              <div className="rounded-lg mb-2 overflow-hidden">
                <div
                  style={{
                    height: 450,

                    width: 800,

                    position: "relative",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              {/* <div className="text-3xl font-medium">{item.title}</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
