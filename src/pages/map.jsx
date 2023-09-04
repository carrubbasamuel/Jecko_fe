import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import useGeoLocation from '../Hooks/useGeolocation_hook';
import LayoutPages from '../Layout/LayoutPages';
import markerBasket from '../asset/marker_basket.png';
import EventTarget from '../components/map_component/event_target';
import { fetchEventByLocation } from '../redux/eventReducer';


export default function Maps() {
  const dispatch = useDispatch();
  const location = useGeoLocation();
  const fieldsLocation = useSelector(state => state.location.field);
  
  const handleClick = async (id) => {
    await dispatch(fetchEventByLocation(id))
  }


  const mapStyle = {
    height: '100vh',
  };

  const maxBounds = [
    [-90, -180], 
    [90, 180],   
  ];


  return (
    <LayoutPages>
    {location && 
        <MapContainer style={mapStyle} center={[location.latitude, location.longitude]} zoom={12} scrollWheelZoom={true} maxBounds={maxBounds} minZoom={2} >
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
              eventHandlers={{
                click: () => {
                  handleClick(field._id)
                },
              }}
            >
              <Popup>
                <EventTarget field={field}/>
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
