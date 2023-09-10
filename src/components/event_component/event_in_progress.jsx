import React from 'react';
import { useSelector } from 'react-redux';
import useCountdown from '../../Hooks/useEventCountdown_hook';


export default function EventInProgress(){
    const events = useSelector(state => state.event.event);
    const currentDate = new Date();
    const currentEvent = events && events.length > 0  && events.find((event) => {
        const eventDateStart = new Date(event.dateStart);
        const eventDateEnd = new Date(event.dateEnd);
        return currentDate >= eventDateStart && currentDate < eventDateEnd;
    });

     
    return(
        currentEvent &&
        <div className='ms-3 me-3 currentEvent shadow'>
            <p>Evento in corso...</p>
            <CountdownForEvent endDate={currentEvent.dateEnd} />
        </div> 
    );
}

function CountdownForEvent({ endDate }) {
    const countdown = useCountdown(endDate);
    if(countdown === 'L\'evento è terminato') return <p className='fs-6 m-0'>{countdown}</p>;
    else return <div className='d-flex justify-content-between'><p className='fs-6 me-2'>Scade tra:</p><p className='fs-6 m-0'>{countdown}</p></div>;
}