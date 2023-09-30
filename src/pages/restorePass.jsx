import { useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from 'react-reveal';
import { Link, useNavigate } from 'react-router-dom';
import { changePass, checkPin, forgot, reset } from '../redux/restoreReducer';
import {toast} from 'react-toastify'


export default function RestorePass() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const email = useRef(null);
    const pin = useRef(null);
    const password = useRef(null);
    const currentEmail = useSelector(state => state.restore.currentEmail);

    const [step, setStep] = useState(0);


    const handleClick = () => {
        if (step === 0) {
            dispatch(forgot(email.current.value)).then((res) => {
                if(res.payload === 404){
                    toast.error('Email non valida')
                }else{
                     setStep(1);
                }
            })
           
        } if (step === 1) {
            dispatch(checkPin({ pin: pin.current.value })).then((res)=> {
                if(res.payload === 404){
                    toast.error('Pin non valido')
                }else{
                    setStep(2);
                }
            })
        } if (step === 2) {
            dispatch(changePass({ password: password.current.value, email: currentEmail }))
                .then((res) => {
                    if (res.payload.status === 200) {
                        dispatch(reset());
                        navigate('/login');
                    }else if(res.payload.status === 400 ){
                        console.log(res.payload);
                        res.payload.data.errors.forEach((error) => toast.error(error.msg))
                    }
                });
        }
    }


    return (
        <Container className='d-flex justify-content-center align-items-center p-3 restore position-relative'>
            
            <Link to='/login' className='text-decoration-none text-dark exit'>
            <Fade top><AiOutlineArrowLeft className='mb-3' size={34} /></Fade>
            </Link>
            <Row>
                <Col className='d-flex flex-column align-items-center'>
                    {step === 0 &&
                        <Fade bottom cascade>
                            <div className='w-100'>
                            <h4 className='text-center mb-4'>Recupera la password, inserisci la tua email</h4>
                            <Form.Control type="email" placeholder="Email" ref={email} />
                            <Button className='mt-3 w-100' onClick={handleClick}>Invia</Button>
                            </div>
                        </Fade>
                    }

                    {step === 1 &&
                        <Fade bottom cascade>
                            <div className='w-100'>
                                <h4 className='text-center mb-4'>Inserisci il Pin di recupero,<br /> è stato inviato alla tua email</h4>
                            <Form.Control type="text" placeholder="Pin" ref={pin} />
                            <Button className='mt-3 w-100' onClick={handleClick}>Invia</Button>
                            </div>
                            
                        </Fade>
                    }

                    {step === 2 &&
                        <Fade bottom cascade>
                            <div className='w-100'>
                                <h4 className='text-center mb-4'>Inserisci la nuova password</h4>
                            <Form.Control type="password" placeholder="Password" ref={password} />
                            <Button className='mt-3 w-100' onClick={handleClick}>Invia</Button>
                            </div>
                            
                        </Fade>
                    }
                </Col>
            </Row>
        </Container>
    )
}