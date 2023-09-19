import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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
                        dispatch(fetchLocationByCity('Firenze'))
                    } else if (isInLombardy(latitude, longitude)) {
                        cityCoords = { latitude: 45.4642, longitude: 9.1900 }; 
                        await dispatch(fetchLocationByCity('Milano'))

                    } else if (isInLazio(latitude, longitude)) {
                        cityCoords = { latitude: 41.9028, longitude: 12.4964 }; 
                        await dispatch(fetchLocationByCity('Roma'))
                    }else{
                        toast.info('Non ci sono campi nelle vicinanze', {position: 'top-right'});
                    }

                    setLocation(cityCoords);
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        console.error('User denied the request for Geolocation.');
                        return setLocation(null);
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

function isInTuscany(latitude, longitude) {
    return (
        latitude >= 42.3630 && 
        latitude <= 44.2478 && 
        longitude >= 10.0979 && 
        longitude <= 12.6563 
    );
}

function isInLombardy(latitude, longitude) {
    return (
        latitude >= 45.1415 && 
        latitude <= 46.5585 && 
        longitude >= 8.4821 && 
        longitude <= 10.5011 
    );
}

function isInLazio(latitude, longitude) {
    return (
        latitude >= 40.7792 && 
        latitude <= 42.0779 && 
        longitude >= 11.7661 && 
        longitude <= 13.4851 
    );
}



export default useGeoLocation;
