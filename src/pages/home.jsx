

import React from 'react';
import useGeoLocation from '../Hooks/Geeolocation_hook';
import Maps from '../components/home_componet/Maps';




export default function Home() {
    const location = useGeoLocation();
   
    return (
        <div>
           <Maps location={location}/> 
        </div>
    )
}