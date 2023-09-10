import { Accordion, Button, Image } from 'react-bootstrap';
import { BsFillPinMapFill } from 'react-icons/bs';
import { FaFlagCheckered } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJoinInEvent } from '../../redux/eventReducer';
import { useEffect } from 'react';
import { toast } from 'react-toastify';



export default function EventAccordion() {
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.event);
    const { socket } = useSelector(state => state.socket);

    const handleRefreshPlayer = ({eventTitle, playerAdded}) => {
        toast.success(
            <div>
                😁 Nuovo giocatore iscritto! <strong>{playerAdded.username}</strong> si è iscritto all'evento {eventTitle}
            </div>
        );
    }

    useEffect(() => {
        socket.on('refresh-player', handleRefreshPlayer);

        return () => {
            socket.off('refresh-player', handleRefreshPlayer);
        }
    }, []);


    const handleClick = async (event) => {
        await dispatch(fetchJoinInEvent(event))
    };

    return (
        <div className='eventBox'>

            <Accordion>
                {events.map((event, index) => (
                    <Accordion.Item key={index} eventKey={index}>
                        <Accordion.Header>{event.title}</Accordion.Header>
                        <Accordion.Body>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                    <p className='d-flex align-items-center gap-2'><BsFillPinMapFill size={15} />{formatDate(event.dateStart)}</p>
                                    <p className='d-flex align-items-center gap-2'><FaFlagCheckered size={15}/>{formatDate(event.dateEnd)}</p>
                                </div>
                                <div className='d-flex flex-column align-items-center'>
                                    <Image src={event.creator.avatar} roundedCircle width={40} className='shadow' height={40} />
                                   <p className='ms-2'>{event.creator.username}</p>
                                </div>
                            </div>
                            <hr />
                            <p>{event.description}</p>
                            {!event.isMine && <div className='text-end mt-3'>
                                <Button className='mt-2' variant='primary' onClick={() => handleClick(event)}>Partecipa!</Button>
                            </div>}

                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}



function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

