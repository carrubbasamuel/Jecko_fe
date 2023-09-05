import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useCountdown from '../../Hooks/useEventCountdown_hook';

export default function EventAccordion() {
    const events = useSelector(state => state.event.event);
    const currentDate = new Date();
    const currentEvent = events.find((event) => {
        const eventDateStart = new Date(event.dateStart);
        const eventDateEnd = new Date(event.dateEnd);
        return currentDate >= eventDateStart && currentDate < eventDateEnd;
    });

    return (
        <div className='eventBox'>
            {currentEvent && (
                <div className='ms-3 me-3 currentEvent'>
                    <h4>Evento in corso...</h4>
                    <p>{currentEvent.title}</p>
                    <p>Tempo rimanente:</p>
                    <CountdownForEvent endDate={currentEvent.dateEnd} />
                </div> 
            )}
            <Accordion>
                {events.map((event, index) => (
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>{event.title}</Accordion.Header>
                        <Accordion.Body>
                            <p>From: {formatDate(event.dateStart)}</p>
                            <p>To: {formatDate(event.dateEnd)}</p>
                            <hr />
                            <p>{event.description}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}

function CountdownForEvent({ endDate }) {
    const countdown = useCountdown(endDate);
    return <p className='fs-3'>{countdown}</p>;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
