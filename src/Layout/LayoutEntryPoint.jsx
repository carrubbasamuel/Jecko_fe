

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Svg } from '../asset/Jecko_Log.svg';
import logo from '../asset/jecko_logo.png';



export default function LayoutEntryPoint({ children }) {
    const location = useLocation();
    return (
        <div className='entrypoint'>
         <Svg className='svg-log'/>

        <Container id='entrypage'>
            <Row className='justify-content-center h-100 align-items-center'>
                <Col sm={12} md={6}>
                    <div className='div-logo'>
                        <Link to={"/login"} className={`logo ${location.pathname === '/singup' ? 'logo-singup' : ''}`}>
                            <img src={logo} alt='logo'  />
                        </Link>
                    </div>

                    {children}

                </Col>
            </Row>
        </Container>
        </div>
        
    )
}