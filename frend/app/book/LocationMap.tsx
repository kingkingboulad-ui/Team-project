"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LocationMapProps = {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MoveMap({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([latitude, longitude], 15, {
      duration: 1.2,
    });
  }, [latitude, longitude, map]);

  return null;
}

function MapClick({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(event) {
      onLocationChange(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export default function LocationMap({ latitude, longitude, onLocationChange }: LocationMapProps) {
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support location.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationChange(position.coords.latitude, position.coords.longitude);
        setLoading(false);
      },
      () => {
        alert("Please allow location access from your browser.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="w-full">
      {/* Current Location */}
      <button
        type="button"
        onClick={getCurrentLocation}
        disabled={loading}
        className="mb-2.5 flex h-10 items-center justify-center rounded-lg border border-[#00535B] px-4 text-xs font-semibold text-[#00535B] transition hover:bg-[#00535B] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Getting location..." : "📍 Use My Current Location"}
      </button>

      {/* Map */}
      <div className="h-[240px] w-full overflow-hidden rounded-xl border border-gray-200 sm:h-[280px]">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MoveMap latitude={latitude} longitude={longitude} />
          <MapClick onLocationChange={onLocationChange} />
          <Marker position={[latitude, longitude]} icon={markerIcon} />
        </MapContainer>
      </div>
    </div>
  );
}
