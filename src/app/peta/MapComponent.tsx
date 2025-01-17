"use client";

import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Indonesia from "../components/indonesia-prov.json";
import "./leaflet.css";
import { GeoJsonObject } from "geojson";
import { useRouter } from "next/navigation";

const capitalizeWords = (str) => {
  return str.toUpperCase();
};

export default function MapComponent() {
  const router = useRouter();


  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillColor: "#ff7800",
          weight: 2,
          color: "#666",
          fillOpacity: 0.7,
        });
        layer
          .bindPopup(
            `<div class="custom-popup">${capitalizeWords(
              feature.properties.Propinsi
            )}</div>`
          )
          .openPopup();
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillColor: "gray",
          weight: 1,
          opacity: 1,
          color: "gray",
          fillOpacity: 0.7,
        });
        layer.closePopup();
      },
      click: () => {
        router.push(`/peta/${feature.properties.ID}`);
      },
    });
  };

  const geoJSONStyle = () => {
    return {
      weight: 1,
      opacity: 1,
      color: "gray",
      fillOpacity: 0.7,
    };
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[-2, 118]}
        zoom={5.5}
        zoomDelta={0.1}
        zoomSnap={0}
        style={{ backgroundColor: "white", height: "100%", width: "100%" }}
        attributionControl={false}
        zoomControl={false}
        doubleClickZoom={false}
        dragging={false}
        scrollWheelZoom={false}
      >
        <GeoJSON
          data={Indonesia as GeoJsonObject}
          style={geoJSONStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
