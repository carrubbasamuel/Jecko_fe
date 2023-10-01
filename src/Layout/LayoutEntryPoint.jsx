

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Svg } from '../asset/Jecko_Log.svg';
import logo from '../asset/jecko_logo.png';
import { useNavigate } from 'react-router-dom'



export default function LayoutEntryPoint({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='entrypoint'>
         <Svg className='svg-log'/>

        <Container id='entrypage'>
            <Row className='justify-content-center h-100 align-items-center'>
                <Col sm={12} md={6}>
                    {location.pathname === '/login' && <div className='div-logo'>
                            <img src={logo} alt='logo'  />
                    </div>}

                    {children}

                </Col>
            </Row>
        </Container>
        </div>
        
    )
}