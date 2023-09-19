
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useOpenFieldDetails from '../Hooks/useOpenFieldDetails';
import useSocket from '../Hooks/useSocket';
import Logo from '../asset/jecko_logo.png';
import Footer from '../components/pages_layout_components/Footer';
import NavbarMenu from '../components/pages_layout_components/Navbar';
import { fetchLocationByCity } from '../redux/locationReducer';



export default function LayoutPages({ children }) {
    const dispatch = useDispatch();
    const {handleOpenFieldDetails} = useOpenFieldDetails();
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleRefreshEvent = async ({ location, title}) => {
        await dispatch(fetchLocationByCity(location.city));
        const locationName = location.name;
        toast.success(
            <div>
                🚀 Nuovo Evento creato! <strong onClick={() => handleOpenFieldDetails(location)}>{title}</strong> presso {locationName}
            </div>
        );
    }

    useSocket('refresh-event', handleRefreshEvent)

    return (
        <>
            <Row>
                {isMobile && <div className='header-mobile'><img src={Logo} alt='logo' height={70} width={70} /></div>}
                <NavbarMenu />
                <Col className='page-container'>
                    {children}
                    {location.pathname !== '/map' && <Footer />}
                </Col>
            </Row>
        </>
    );
}

