import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useEventCountdown from '../../Hooks/useEventCountdown_hook';
import ModalCreateEvent from './modal_create_event';

export default function EventTarget({ field }) {
    const [showModal, setShowModal] = useState(false);
    const event = useSelector(state => state.event.event);


    const endDate = event && event[0] && event[0].dateEnd ? event[0].dateEnd : null;
    const countdown = useEventCountdown(endDate);
    

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <div>
            <h3>{field.name}</h3>
            <hr />
            {event && endDate ? (
                <div>
                    <p>{event[0].description}</p>
                    <div>
                        {countdown}
                    </div>
                </div>
            ) : (
                <p>Non ci sono eventi in programma</p>
            )}
            <Button variant="primary" onClick={handleShowModal}>
                Crea Evento
            </Button>

            <ModalCreateEvent showModal={showModal} setShowModal={setShowModal} field={field}/>
        </div>
    );
}
