"use client"
import Header from "@/app/components/Header"
import { useRouter } from "next/navigation";

export default function Test() {
  const router = useRouter()
  return (
    <div>
      <Header />
      <div className="flex flex-col sm:flex-row justify-between gap-8 mt-12 mb-12 w-full flex-wrap " onClick={() => router.back()}>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
        <div className="border rounded-lg w-[430px] h-[400px]">
          <div></div>
        </div>
      </div>
    </div>
  );
}
