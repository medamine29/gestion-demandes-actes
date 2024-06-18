// src/components/MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapContainerProps } from 'react-leaflet';

const Map = ({ center, markerTitle }) => {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup openPopup>
          { markerTitle }
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
