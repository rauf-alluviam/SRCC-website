'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ports = [
  { name: 'ICD Sanand', lat: 23.02448, lon: 72.38010 },
  { name: 'Mundra Port', lat: 22.78310, lon: 69.67638 },
  { name: 'Varnama', lat: 22.17154, lon: 73.16087 },
  { name: 'Pipavav Port', lat: 20.92208, lon: 71.51001 },
  { name: 'Hazira', lat: 21.14365, lon: 72.64950 },
  { name: 'Cochin Port', lat: 9.96292, lon: 76.27472 },
];

// Custom Truck Icon
const truckIcon = L.divIcon({
  html: `<div style="font-size: 24px; color: #f7941e;">🚚</div>`,
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function PortMap() {
  return (
    <div className="rounded-2xl overflow-hidden h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full shadow-lg">
      <MapContainer
        center={[21.5, 73.5]}
        zoom={5.5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ports.map((port, i) => (
          <Marker
            key={i}
            position={[port.lat, port.lon]}
            icon={truckIcon}
          >
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              permanent
              className="text-sm font-semibold bg-orange-500 text-white px-2 py-1 rounded"
            >
              {port.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
