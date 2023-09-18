import { Accordion, Button, Image } from 'react-bootstrap';
import { BsFillPinMapFill } from 'react-icons/bs';
import { FaFlagCheckered } from 'react-icons/fa';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useSocket from '../../Hooks/useSocket';
import { fetchJoinInEvent } from '../../redux/eventReducer';



export default function EventAccordion() {
    const dispatch = useDispatch();
    const events = useSelector(state => state.event.event);

    

    useSocket('refresh-player', handleRefreshPlayer);


    const handleClick = async (event) => {
        await dispatch(fetchJoinInEvent(event))
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require('./emptybasket.json'),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };



    return (
        <div className='eventBox'>
            {events.length === 0 && 
            <div className='empty'>
                <p>Non ci sono eventi in questo campo.</p><p>Crea tu un evento!</p>
                <Lottie options={defaultOptions} height={150} width={150} />
                
            </div>}
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

const handleRefreshPlayer = ({eventTitle, playerAdded}) => {
        toast.success(
            <div>
                😁 Nuovo giocatore iscritto! <strong>{playerAdded.username}</strong> si è iscritto all'evento {eventTitle}
            </div>
        );
    }
