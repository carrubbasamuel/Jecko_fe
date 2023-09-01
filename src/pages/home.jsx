

import React from 'react';
import useGeoLocation from '../Hooks/Geeolocation_hook';
import LayoutPages from '../Layout/LayoutPages';
import Maps from '../components/home_componet/Maps';




export default function Home() {
    const location = useGeoLocation();
   
    return (
        <LayoutPages>
           <Maps location={location}/> 
        </LayoutPages>
    )
}