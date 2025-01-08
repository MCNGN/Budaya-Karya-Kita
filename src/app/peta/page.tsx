"use client";

import dynamic from "next/dynamic";
import Header from "../components/Header";

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});


export default function MapPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow">
        <MapComponent />
      </div>
    </div>
  );
}
