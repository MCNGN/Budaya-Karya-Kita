"use client";

import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Indonesia from "../components/indonesia-prov.json";
import "./leaflet.css";
import { GeoJsonObject } from "geojson";
import { useState } from "react";

export default function MapComponent() {
  const [provinceId, setProvinceId] = useState("")

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillColor: "#ff7800",
          weight: 2,
          color: "#666",
          fillOpacity: 0.7,
        });
        layer.bindPopup(`<div class="custom-popup">${feature.properties.Propinsi}</div>`).openPopup();
        // setSelectedFeature(feature);
        setProvinceId(feature.properties.ID)
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
        setProvinceId("")
        // setSelectedFeature(null);
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
      <div>{provinceId}</div>
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
