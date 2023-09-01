import L from 'leaflet'; // Importa la libreria Leaflet
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet';

function Maps({ location }) {

  const mapStyle = {
    height: '100vh',
  };

  const polygonPoints = [
    [43.769562, 11.255814],
    [43.761431, 11.265701],
    [43.766761, 11.278801],
    [43.772751, 11.278844],
    [43.777198, 11.272986],
    [43.778735, 11.263569],
    [43.774076, 11.255784], 
  ];

  
  const customIcon = new L.Icon({
    iconUrl: 'https://www.svgrepo.com/show/350379/map-marker.svg',
    iconSize: [50, 50],
  });

  return (
    location && (
      <MapContainer style={mapStyle} center={[location.latitude, location.longitude]} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
        positions={polygonPoints}
        color="blue"
        fillColor="blue" 
        fillOpacity={0.5} 
      />
        <Marker icon={customIcon} position={[location.latitude, location.longitude]}>
          <Popup>
            I'm here
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
}

export default Maps;
