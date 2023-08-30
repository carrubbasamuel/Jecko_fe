import { useRef } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../redux/userReducer";

export default function FormLogin() {
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: email.current.value,
            password: password.current.value,
        }

        dispatch(fetchLogin(loginData));
    }


    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Fade bottom cascade>
                <Fade top>
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control ref={email} type="email" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control ref={password} type="password" placeholder="Password" />
                    </FloatingLabel>
                </Fade>
                <a href="/" className="text-muted mt-3">Forgot password?</a>

                <div className="d-flex align-items-center mt-4 justify-content-end ">
                    <Button type="submit" className="btn-primary me-3">Login</Button>
                    <Link to="/singup" className="text-muted">Singup</Link>
                </div>
            </Fade>
        </Form>
    )
}