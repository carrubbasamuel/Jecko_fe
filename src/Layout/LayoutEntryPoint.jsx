

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../asset/jecko_logo.png';
import {ReactComponent as Svg} from '../asset/Jecko_Log.svg';



export default function LayoutEntryPoint({ children }) {
    const location = useLocation();
    return (
        <>
        <div className='div-svg'>
         <Svg className='svg-log'/>
        </div>
        <Container>
            <Row className='justify-content-center'>
                <Col sm={12} md={6}>
                    <div className='div-logo'>
                        <Link to={"/"} className={`logo ${location.pathname === '/singup' ? 'logo-singup' : ''}`}>
                            <img src={logo} alt='logo'  />
                        </Link>
                    </div>

                    {children}

                </Col>
            </Row>
        </Container>
        </>
        
    )
}