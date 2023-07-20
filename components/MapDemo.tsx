"use client";
import React, { useEffect, useRef, useState } from "react";
import L, { Map } from "leaflet";

import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapDemo = ({ loc }: { loc: any }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [address, setAddress] = useState<string | null>("");
  const [currentLocation, setCurrentLocation] = useState<any | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = L.map(mapContainerRef.current as HTMLElement).setView(
        [0, 0],
        2
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(mapInstance);

      mapInstance.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setCurrentLocation([lat, lng]);
      });

      setMap(mapInstance);
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  useEffect(() => {
    if (map && currentLocation) {
      const customIcon = L.icon({
        iconUrl: "/location-pin.png", // Replace 'custom-marker.png' with your custom marker image file path
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });
      const marker = L.marker(currentLocation, { icon: customIcon }).addTo(map);

      // Optional: Set the map's center and zoom to the selected location
      map.flyTo(currentLocation, 10);

      const fetchAddress = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${currentLocation[0]}&lon=${currentLocation[1]}`
          );
          setAddress(response.data.display_name);
          loc("location", response.data.display_name);
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress("Address not available");
        }
      };

      fetchAddress();
      // Remove the marker when the component unmounts or the location changes
      return () => {
        marker.remove();
      };
    }
  }, [map, currentLocation, loc]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
      <div className="mt-4">
        <h3 className="text-sm font-mono">Selected Location Address:</h3>
        <p className="font-semibold">{address}</p>
      </div>
    </div>
  );
};

export default MapDemo;
