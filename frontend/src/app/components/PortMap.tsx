'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup,Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ✅ Default marker icon for Leaflet (type-safe)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const ports = [
  { name: 'ICD Sanand', lat:23.024483450807224,lon: 72.38010497341533 },
  { name: 'Mundra Port', lat:22.783104997890206, lon: 69.67638628263923 },
  { name: 'Varnama', lat: 22.171543706144718, lon: 73.16087189612051 },
  { name: 'Pipavav Port', lat: 20.922087045459726, lon: 71.51001550958918 },
  { name: 'Hazira', lat: 21.1436540529827, lon: 72.64950441070155 },
  { name: 'Cochin Port', lat: 9.96292725266072, lon:76.2747224945217 },
];


export default function PortMap() {
  // Create a custom DivIcon
  const createTruckIcon = (label: string) =>
    L.divIcon({
      html: `<div style="font-size: 24px; color: #f7941e;">🚚</div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

  return (
    <div className="rounded-2xl overflow-hidden h-[450px] w-full shadow-lg">
      <MapContainer
        center={[21.5, 73.5]}
        zoom={5.5}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ borderRadius: '1rem' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ports.map((port, i) => (
          <Marker
            key={i}
            position={[port.lat, port.lon]}
            icon={createTruckIcon(port.name)}
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