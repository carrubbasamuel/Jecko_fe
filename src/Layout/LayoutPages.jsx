
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useOpenFieldDetails from '../Hooks/useOpenFieldDetails';
import useSocket from '../Hooks/useSocket';
import Footer from '../components/pages_layout_components/Footer';
import NavbarMenu from '../components/pages_layout_components/Navbar';



export default function LayoutPages({ children }) {
    const {handleOpenFieldDetails} = useOpenFieldDetails();

    const handleRefreshEvent = ({ location, title}) => {
        const locationName = location.name;
        toast.success(
            <div>
                🚀 Nuovo Evento creato! <a href='#' onClick={() => handleOpenFieldDetails(location)}>{title}</a> presso {locationName}
            </div>
        );
    }

    useSocket('refresh-event', handleRefreshEvent)

    return (
        <>
            <Row>
                <Col md={1} className='p-0'>
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

