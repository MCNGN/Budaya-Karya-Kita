"use client";

import Header from "../components/Header";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import indonesia from "../components/indonesia-prov.json";

export default function MapPage() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center bg-white">
        <MapContainer
          center={[-2, 120]}
          zoom={5}
          style={{ backgroundColor: "white",height: "600px", width: "100%" }}
          attributionControl={false}
          // dragging={false}
          zoomControl={false}
        >
          <GeoJSON data={indonesia} style={{ fillColor: "#000", color: "#fff" }} />
        </MapContainer>
      </div>
    </div>
  );
}
