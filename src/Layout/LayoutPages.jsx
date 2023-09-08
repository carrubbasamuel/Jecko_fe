
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Footer from '../components/pages_layout_components/Footer';
import NavbarMenu from '../components/pages_layout_components/Navbar';
import ChatList from '../components/chat_component/chat_list';


export default function LayoutPages({ children }) {

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
