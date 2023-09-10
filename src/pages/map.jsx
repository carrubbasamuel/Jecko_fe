import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { Circle, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import useOpenFieldDetails from '../Hooks/useOpenFieldDetails';
import useGeoLocation from '../Hooks/useGeolocation_hook';
import LayoutPages from '../Layout/LayoutPages';
import markerBasket from '../asset/marker_basket.png';
import EventTarget from '../components/event_component/event_target';
import { fetchEventByLocation} from '../redux/eventReducer';





export default function Maps() {
  const dispatch = useDispatch();
  const location = useGeoLocation();
  const fieldsLocation = useSelector(state => state.location.field);
  const fieldSelected = useSelector(state => state.location.fieldSelected);
  const { showDetails } = useSelector(state => state.event);
  const {handleOpenFieldDetails} = useOpenFieldDetails(); 

  

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


  const mapStyle = {
    height: '100vh',
  };

  const maxBounds = [
    [-90, -180],
    [90, 180],
  ];


  return (
    <LayoutPages>
      {showDetails && <EventTarget field={fieldSelected} />}
      {location &&
        <MapContainer style={mapStyle} center={[location.latitude, location.longitude]} zoom={12} scrollWheelZoom={true} maxBounds={maxBounds} minZoom={2} zoomControl={false} >
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
                  handleOpenFieldDetails(field)
                },
              }}
            >
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
