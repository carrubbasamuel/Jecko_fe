import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setShowDetails } from '../../redux/eventReducer';
import EventAccordion from './event_accordion_list';
import EventInProgress from './event_in_progress';
import FormSetPrenotation from './form_create_event';
import './style.css';


export default function EventTarget({ field }) {
    const dispatch = useDispatch();
    const { showDetails } = useSelector(state => state.event);
    const [eventDate, setEventDate] = useState(false);

    const handleClose = () => {
        dispatch(setShowDetails(false));
        setEventDate(false);
    };

    

    return (
        <>
            <Offcanvas show={showDetails} id='field-details' onHide={handleClose} placement='end'>
                <div className='text-end me-4 mt-4'>
                    <AiFillCloseCircle onClick={handleClose} size={30} style={{cursor: 'pointer'}} />
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
                            CREA UN EVENTO
                        </Button>

                    </>}
                </div>
            </Offcanvas>
        </>
    );
}

