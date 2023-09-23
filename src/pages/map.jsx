import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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
  const mapRef = React.useRef();

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

  const handleCenterMap = (cityName) => {
    if (mapRef.current) {
      const find = location.cityCoords.find(city => city.city === cityName);
      const { latitude, longitude } = find;
      mapRef.current.setView([latitude, longitude], 12);
    }
  };

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

      {location === 401 && <DaniedGeolocation />}
      {isLoading && <div className="loading-indicator">
        <GridLoader color={"green"} loading={isLoading} size={20} />
      </div>}

      {showDetails && <EventTarget field={fieldSelected} />}
      {location && isLoading === false && location !== 401 &&
        <>
          <div className='centermap'>
            <Button variant='primary' onClick={() => handleCenterMap('Firenze')}>Firenze</Button>
            <Button variant='primary' onClick={() => handleCenterMap('Milano')}>Milano</Button>
            <Button variant='primary' onClick={() => handleCenterMap('Roma')}>Roma</Button>
          </div>

          <MapContainer ref={mapRef} style={mapStyle} center={[location.userCoords.latitude, location.userCoords.longitude]} attributionControl={false} zoom={12} scrollWheelZoom={true} maxBounds={maxBounds} minZoom={2} zoomControl={false} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[location.userCoords.latitude, location.userCoords.longitude]} 
            icon={L.icon({
              iconUrl: require('./user.png'),
              iconSize: [30, 30],
            })}
             >
              
            </Marker>
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

            {location && location !== 401 && location.cityCoords.map((city, index) => (
              <Circle
                key={index}
                center={[city.latitude, city.longitude]}
                pathOptions={{ color: 'green' }}
                radius={10000}
              />
            ))}

          </MapContainer>
        </>

      }
    </LayoutPages>
  );
}
