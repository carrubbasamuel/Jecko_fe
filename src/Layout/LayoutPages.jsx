
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Footer from '../components/pages_layout_components/Footer';
import NavbarMenu from '../components/pages_layout_components/Navbar';


export default function LayoutPages({ children }) {
    
    return (
        <Row className='leyoutpage'>
            <Col md={1}>
                <NavbarMenu />
            </Col>

            <Col md={11} className='page-container'>
                {children}
                <Footer />
            </Col>
        </Row>
    );
}
