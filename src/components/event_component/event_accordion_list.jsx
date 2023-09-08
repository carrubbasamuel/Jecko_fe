import { Accordion, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import EventInProgress from './event_in_progress';
import { fetchJoinInEvent } from '../../redux/eventReducer';



export default function EventAccordion() {
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.event);

    const handleClick = async (event) => {
        await dispatch(fetchJoinInEvent(event))
    };

    return (
        <div className='eventBox'>
            <EventInProgress />
            <Accordion>
                {events.map((event, index) => (
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>{event.title}</Accordion.Header>
                        <Accordion.Body>
                            <p>From: {formatDate(event.dateStart)}</p>
                            <p>To: {formatDate(event.dateEnd)}</p>
                            <hr />
                            <p>{event.description}</p>
                            <Button className='mt-2' variant='primary' onClick={()=>handleClick(event)}>Join!</Button>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}



function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
