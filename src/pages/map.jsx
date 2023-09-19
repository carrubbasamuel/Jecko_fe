import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import {
  GridLoader
} from 'react-spinners';
import useGeoLocation from '../Hooks/useGeolocation_hook';
import useOpenFieldDetails from '../Hooks/useOpenFieldDetails';
import LayoutPages from '../Layout/LayoutPages';
import markerBasket from '../asset/marker_basket.png';
import markerBasketEvent from '../asset/marker_basket_event.png';
import EventTarget from '../components/event_component/event_target';
import DaniedGeolocation from '../components/map_component/danied_geo';
import { fetchEventByLocation } from '../redux/eventReducer';

export default function Maps() {
  const dispatch = useDispatch();
  const location = useGeoLocation();
  const fieldsLocation = useSelector(state => state.location.field);
  const fieldSelected = useSelector(state => state.location.fieldSelected);
  const { showDetails } = useSelector(state => state.event);
  const { handleOpenFieldDetails } = useOpenFieldDetails();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let intervalId;
    if (showDetails) {
      intervalId = setInterval(() => {
        dispatch(fetchEventByLocation(fieldSelected._id));
      }, 30000);
    }

    return () => {
      clearInterval(intervalId);
    }
  }, [dispatch, showDetails, fieldSelected]);

  useEffect(() => {
    if (location) {
      setIsLoading(false);
    }
  }, [location]);

  const mapStyle = {
    height: '100vh',
  };

  const maxBounds = [
    [-90, -180],
    [90, 180],
  ];

  return (
    <LayoutPages>
      {location === null && isLoading===false && <DaniedGeolocation />}
       {isLoading && location !== null && <div className="loading-indicator">
        <GridLoader  color={"green"} loading={isLoading} size={20} />
        </div>}

      {showDetails && <EventTarget field={fieldSelected} />}
      {location && isLoading === false &&
        <MapContainer style={mapStyle} center={[location.latitude, location.longitude]} attributionControl={false} zoom={12} scrollWheelZoom={true} maxBounds={maxBounds} minZoom={2} zoomControl={false} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {fieldsLocation && fieldsLocation.map((field, index) => (
            <Marker
              key={index}
              position={[field.geo.lat, field.geo.lng]}
              icon={L.icon({
                className: field.haveEvents ? 'marker-event' : '',
                iconUrl: field.haveEvents ? markerBasketEvent : markerBasket,
                iconSize: [50, 50],

              })}
              eventHandlers={{
                click: () => {
                  handleOpenFieldDetails(field)
                },
              }}
            >
            </Marker>
          ))}

          {fieldsLocation.length > 0 && <Circle
            center={[location.latitude, location.longitude]}
            radius={9000}
            pathOptions={{ color: 'green' }}
          />}
        </MapContainer>
      }
    </LayoutPages>
  );
}
