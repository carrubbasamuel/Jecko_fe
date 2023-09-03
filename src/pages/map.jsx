import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import useGeoLocation from '../Hooks/Geeolocation_hook';
import LayoutPages from '../Layout/LayoutPages';
import markerBasket from '../asset/marker_basket.png';

export default function Maps() {
  const location = useGeoLocation();
  const fieldsLocation = useSelector(state => state.location.field);

  const mapStyle = {
    height: '100vh',
  };

  return (
    <LayoutPages>
    {location && 
        <MapContainer style={mapStyle} center={[location.latitude, location.longitude]} zoom={12} scrollWheelZoom={true} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {fieldsLocation && fieldsLocation.map((field, index) => (
            <Marker
              key={index}
              position={[field.geo.lat, field.geo.lng]}
              icon={L.icon({
                iconUrl: markerBasket,
                iconSize: [50, 50],
                
              })}
            >
              <Popup>
                <div>
                  <h2>{field.name}</h2>
                  <p>Lat: {field.geo.lat}, Lon: {field.geo.lng}</p>
                </div>
              </Popup>
            </Marker>
          ))}


          <Circle
            center={[location.latitude, location.longitude]}
            radius={9000}
            pathOptions={{ color: 'green' }}
          />
        </MapContainer>
    }
    </LayoutPages>
  );
}
