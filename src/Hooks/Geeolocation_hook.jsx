import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLocationByCity } from '../redux/locationReducer';

function useGeoLocation(enableHighAccuracy = true) {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const coords = position.coords;
                    const { latitude, longitude } = coords;

                    let cityCoords = { latitude, longitude };
                    if (isInTuscany(latitude, longitude)) {
                        cityCoords = { latitude: 43.7696, longitude: 11.2558 }; 
                        await dispatch(fetchLocationByCity('Firenze'))
                    } else if (isInLombardy(latitude, longitude)) {
                        cityCoords = { latitude: 45.4642, longitude: 9.1900 }; 
                        await dispatch(fetchLocationByCity('Milano'))

                    } else if (isInLazio(latitude, longitude)) {
                        cityCoords = { latitude: 41.9028, longitude: 12.4964 }; 
                        await dispatch(fetchLocationByCity('Roma'))
                    }

                    setLocation(cityCoords);
                },
                (error) => {
                    console.error(error);
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


function isInTuscany(latitude, longitude) {
    return latitude >= 42.5 && latitude <= 43.8 && longitude >= 10.2 && longitude <= 11.7;
}

function isInLombardy(latitude, longitude) {
    return latitude >= 45.1 && latitude <= 46.6 && longitude >= 8.5 && longitude <= 10.5;
}

function isInLazio(latitude, longitude) {
    return latitude >= 40.8 && latitude <= 42.1 && longitude >= 11.8 && longitude <= 13.5;
}

export default useGeoLocation;
