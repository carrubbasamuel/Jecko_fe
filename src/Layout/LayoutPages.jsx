import React, { useEffect } from 'react';
import { Col, Image, Nav, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../asset/jecko_logo.png';
import { fetchProfile } from '../redux/userReducer';


export default function LayoutPages({ children }) {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])
    return (
        <Row>
            {/* Menu laterale sinistro */}
            <Col md={1} className="d-none d-md-block bg-light sidebar">
                <div className="position-sticky">
                    <Nav className="flex-column">
                        <Image width={130} src={logo} alt="logo" />
                        <Image width={130} src={profile?.avatar} alt="logo" rounded />
                    </Nav>
                </div>
            </Col>

            <Col md={11}>
                {children}
            </Col>
        </Row>
    );
}
