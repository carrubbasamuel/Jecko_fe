import { Col, Container, Image, Row } from 'react-bootstrap';
import logo from '../asset/jecko_logo.png';
import FormLogin from '../components/login_component/form_login';



export default function Login() {
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col sm={12} md={6}>
                    <div className='h-50 text-center'>
                        <Image src={logo} fluid />
                    </div>
                    <FormLogin />
                </Col>
            </Row>
        </Container>
    )
}