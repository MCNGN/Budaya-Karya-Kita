"use client";

import { useParams } from "next/navigation";
import Header from "@/app/components/Header";
import CategoryCard from "@/app/components/CategoryCard";
import Indonesia from "@/app/components/indonesia-prov.json";
import { useRouter } from "next/navigation";

export default function PetaDetail() {
  const params = useParams();
  const router = useRouter()
  // const [click, setClick] = useState(false)
  // const [nameCategory, setCategory] = useState("")
  //   const [provinceName, setProvinceName] = useState("");
  const category = [
    {
      id: 1,
      name: "Tradisi",
      background: "bg-gray-400",
      image: "https://i.imgur.com/PEioGSP.jpeg",
    },
    {
      id: 2,
      name: "Budaya",
      background: "bg-blue-400",
      image: "https://i.imgur.com/hawnOUf.jpeg",
    },
    {
      id: 3,
      name: "Seni",
      background: "bg-orange-400",
      image: "https://i.imgur.com/BkFNEew.jpeg",
    },
    {
      id: 4,
      name: "Kuliner",
      background: "bg-yellow-400",
      image: "https://i.imgur.com/kB3DQxh.jpeg",
    },
    {
      id: 5,
      name: "Musik",
      background: "bg-rose-400",
      image: "https://i.imgur.com/Qdl8YDe.jpeg",
    },
    {
      id: 6,
      name: "Tarian",
      background: "bg-green-400",
      image: "https://i.imgur.com/PlGgQDR.jpeg",
    },
  ];

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  //   const fetchProvince = async () => {
  //     try {
  //       const response = await fetch("https://budaya-karya-kita-backend.vercel.app/province", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           id: params.id, // Ensure the correct parameter is used
  //         }),
  //       });

  //       if (response.ok) {
  //         const jsonResponse = await response.json();
  //         console.log(jsonResponse);
  //         setProvinceName(capitalizeWords(jsonResponse.province_name));
  //       } else {
  //         console.error("Failed to fetch:", response.status, response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchProvince();
  //   });

  const feature = Indonesia.features.find(
    (f) => f.properties.ID === Number(params.id)
  );
  const provinceName = feature?.properties.Propinsi;

  return (
    <div className={`flex flex-col h-screen overflow-hidden`}>
      <Header />
      <div
        className={`flex flex-col w-full h-full px-12 mt-32
        } `}
      >
        <div className="text-5xl">
          <div>{capitalizeWords(provinceName)}</div>
        </div>
          <div>
            <div className={`flex h-full justify-between mt-12 cursor-pointer`}>
              {category.map((value) => (
                <CategoryCard
                  key={value.id}
                  name={value.name}
                  background={value.background}
                  image={value.image}
                  onClick={() => { router.push(`/peta/${params.id}/${value.name.toLowerCase()}`) }}
                />
              ))}
            </div>
            
          </div>
      </div>
    </div>
  );
}
