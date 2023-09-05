import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiFillCloseCircle } from 'react-icons/ai';
import EventAccordion from './event_accordion_list';
import ModalCreateEvent from './modal_create_event';

export default function EventTarget({ field, setShowDetails }) {
    const [showModal, setShowModal] = useState(false);

    

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <>
            <ModalCreateEvent showModal={showModal} setShowModal={setShowModal} />
            <aside id='field-details'>
                <div className='text-end me-4 mt-4'>
                    <AiFillCloseCircle onClick={() => setShowDetails(false)} size={30} />
                </div>
                <div className='eventCardDetails'>
                    <div>
                    <h3 className='m-4'>{field.name}</h3>

                    {/* immagini qui */}

                    
                      <EventAccordion />
                    </div>
                    

                    
                    <Button variant='primary' className='m-3 w-75' onClick={handleShowModal}>
                        Prenota
                    </Button>
                </div> 
            </aside>
        </>
        
    );
}
