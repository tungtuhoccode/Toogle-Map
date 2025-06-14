import * as React from "react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { SearchBar } from "@/Map/MapComponents/SearchBar";

export default function AppMap() {
  return (
    <div className="relative h-screen w-full">
      <Map
        initialViewState={{ longitude: -75.7003, latitude: 45.4201, zoom: 14 }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"
      >
        
      </Map>
      <SearchBar />
    </div>
  );
}
