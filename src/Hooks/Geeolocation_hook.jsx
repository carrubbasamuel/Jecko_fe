import { useEffect, useState } from 'react';


function useGeoLocation(enableHighAccuracy = true) {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(position.coords);
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
    }, [enableHighAccuracy]);

    return location ;
}


export default useGeoLocation;