import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import EventAccordion from './event_accordion_list';
import EventInProgress from './event_in_progress';
import FormSetPrenotation from './form_create_event';
import './style.css';
import { setShowDetails } from '../../redux/eventReducer';


export default function EventTarget({ field }) {
    const dispatch = useDispatch();
    const [eventDate, setEventDate] = useState(false);

    const handleClose = () => {
        dispatch(setShowDetails(false));
        setEventDate(false);
    };

    

    return (
        <>
            <aside id='field-details'>
                <div className='text-end me-4 mt-4'>
                    <AiFillCloseCircle onClick={handleClose} size={30} />
                </div>
                <div className='eventCardDetails'>
                    <div>
                        <h5 className='m-4'>{field.name}</h5>
                    </div>
                    {eventDate && <FormSetPrenotation setEventDate={setEventDate} />}
                    {!eventDate && <>
                        <div className='scrollable-content'>
                        <EventInProgress />
                            <div className='image-cover'>
                                <img src={field.cover} alt='image-field-cover' />
                            </div>
                            <EventAccordion />
                        </div>
                        <Button variant='primary' className='m-3 w-75' onClick={() => setEventDate(true)}>
                            Prenota
                        </Button>

                    </>}
                </div>
            </aside>
        </>
    );
}

