
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import NavbarMenu from '../components/pages_layout_components/Navbar';
import Footer from '../components/pages_layout_components/Footer';


export default function LayoutPages({ children }) {
    
    return (
        <Row className='leyoutpage'>
            <Col md={1} className="menu-container shadow">
                <NavbarMenu />
            </Col>

            <Col md={11} className='page-container'>
                {children}
                <Footer />
            </Col>
        </Row>
    );
}
