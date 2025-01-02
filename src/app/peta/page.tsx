// import { useState } from "react";
import Header from "../components/Header";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import indonesia from "../components/indonesia-prov.json";
import "./leaflet.css"
import { GeoJsonObject } from "geojson"

export default function MapPage() {

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillColor: "#ff7800",
          weight: 2,
          color: "#666",
          fillOpacity: 0.7,
        });
        layer.bindPopup(`<div className="custom-popup">${feature.properties.Propinsi}</div>`).openPopup();
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
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow bg-red-500">
        <MapContainer
          center={[-2, 118]}
          zoom={5.5}
          zoomDelta={0.1}
          zoomSnap={0}
          style={{ backgroundColor: "white", height: "100%", width: "100%" }}
          attributionControl={false}
          zoomControl={false}
        >
          <GeoJSON
            data={indonesia as GeoJsonObject}
            style={geoJSONStyle}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>
    </div>
  );
}
