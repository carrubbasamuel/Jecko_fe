
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/pages_layout_components/Footer';
import NavbarMenu from '../components/pages_layout_components/Navbar';
import { fetchEventByLocation, setShowDetails } from '../redux/eventReducer';
import { setFieldSelected } from '../redux/locationReducer';
import useOpenFieldDetails from '../Hooks/useOpenFieldDetails';



export default function LayoutPages({ children }) {
    const { socket } = useSelector(state => state.socket);
    const {handleOpenFieldDetails} = useOpenFieldDetails();

    const handleRefreshEvent = ({ location, title}) => {
        const locationName = location.name;
        toast.success(
            <div>
                🚀 Nuovo Evento creato! <a href='#' onClick={() => handleOpenFieldDetails(location)}>{title}</a> presso {locationName}
            </div>
        );
    }

    useEffect(() => {
        socket.on('refresh-event', handleRefreshEvent);

        return () => {
            socket.off('refresh-event', handleRefreshEvent);
        }
    }, []);

    return (
        <>
            <Row className='leyoutpage'>
                <Col md={1}>
                    <NavbarMenu />
                </Col>

                <Col md={11} className='page-container'>
                    {children}
                    <Footer />
                </Col>
            </Row>
        </>
    );
}

