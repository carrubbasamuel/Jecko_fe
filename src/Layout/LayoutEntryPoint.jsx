

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../asset/jecko_logo.png';

export default function LayoutEntryPoint({ children }) {
    const location = useLocation();
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col sm={12} md={6}>
                    <div className='div-logo'>
                        <Link to={"/"}>
                        <img src={logo} alt='logo' className={`logo ${location.pathname === '/singup' ? 'logo-singup' : ''}`}  />
                        </Link>
                    </div>

                    {children}
                    
                </Col>
            </Row>
        </Container>
    )
}