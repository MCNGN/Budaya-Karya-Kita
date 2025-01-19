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
      <div className="z-10">
        <Header />
      </div>
      <div className="flex-grow z-0">
        <MapComponent />
      </div>
    </div>
  );
}
