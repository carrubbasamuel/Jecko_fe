import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchLocation } from '../redux/locationReducer';

function useGeoLocation(enableHighAccuracy = true) {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const coords = position.coords;
                    const { latitude, longitude } = coords;
                    const Coordinate = {
                        userCoords: { latitude, longitude },
                        cityCoords: [
                            {city: 'Firenze', latitude: 43.7696, longitude: 11.2558 },//Firenze
                            {city: 'Milano', latitude: 45.4642, longitude: 9.1900 },//Milano
                            {city:'Roma', latitude: 41.9028, longitude: 12.4964 },//Roma
                        ]
                    }
                    if (!isInFlorence(latitude, longitude) && !isInMilan(latitude, longitude) && !isInRome(latitude, longitude)) {
                        toast.info('Non ci sono campi nelle vicinanze', { position: 'bottom-right' });
                    }
                    await dispatch(fetchLocation())
                    setLocation(Coordinate);
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        console.error('User denied the request for Geolocation.');
                        return setLocation(401);
                    }
                },
                {
                    enableHighAccuracy,
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [enableHighAccuracy, dispatch]);

    return location;
}

export default useGeoLocation;



function isInFlorence(latitude, longitude) {
    const florenceCoords = {
        minLat: 43.7165,
        maxLat: 43.8353,
        minLon: 11.1883,
        maxLon: 11.3545
    };
    return (latitude >= florenceCoords.minLat && latitude <= florenceCoords.maxLat &&
            longitude >= florenceCoords.minLon && longitude <= florenceCoords.maxLon);
}

function isInMilan(latitude, longitude) {
    const milanCoords = {
        minLat: 45.3931,
        maxLat: 45.5355,
        minLon: 9.0500,
        maxLon: 9.2393
    };
    return (latitude >= milanCoords.minLat && latitude <= milanCoords.maxLat &&
            longitude >= milanCoords.minLon && longitude <= milanCoords.maxLon);
}

function isInRome(latitude, longitude) {
    const romeCoords = {
        minLat: 41.7940,
        maxLat: 42.0143,
        minLon: 12.4175,
        maxLon: 12.6785
    };
    return (latitude >= romeCoords.minLat && latitude <= romeCoords.maxLat &&
            longitude >= romeCoords.minLon && longitude <= romeCoords.maxLon);
}
