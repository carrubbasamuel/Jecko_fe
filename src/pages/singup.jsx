import { Col, Container, Row } from "react-bootstrap";
import FormSingup from "../components/login_component/form_singup";



export default function Singup() {
    return (
        <Container className="mt-5">
            <Row className='justify-content-center'>
                <Col>
                    <FormSingup />
                </Col>
            </Row>
        </Container>
    )
}