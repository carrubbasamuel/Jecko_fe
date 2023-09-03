import React, { useRef } from 'react';
import { Button, FloatingLabel, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-reveal';
import {  fetchLogin, fetchSingup } from '../../redux/userReducer';
import { useNavigate } from 'react-router-dom';



export default function FormSingup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const username = useRef(null);
    const name = useRef(null);
    const surname = useRef(null);
    const phone = useRef(null);
    const birthdate = useRef(null);
    const avatar = useRef(null);
    const motto = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email.current.value);
        formData.append('password', password.current.value);
        formData.append('username', username.current.value);
        formData.append('name', name.current.value);
        formData.append('surname', surname.current.value);
        formData.append('phone', phone.current.value);
        formData.append('birthdate', birthdate.current.value);
        formData.append('avatar', avatar.current.files[0]);
        formData.append('motto', motto.current.value);

        dispatch(fetchSingup(formData)).then((res) => {
            if(res.meta.requestStatus === 'fulfilled') {
                dispatch(fetchLogin({email: email.current.value, password: password.current.value})).then((res) => {
                    if(res.meta.requestStatus === 'fulfilled') {
                        navigate('/')
                    }
                })
            }
        })
    }


    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
            
                <div className='d-flex justify-content-center flex-md-row flex-column gap-5 '>
                    <div className='flex-grow-1'>
                        <Fade bottom cascade>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3 required-field"  >
                                <Form.Control ref={email} type="email" placeholder='Email address'  />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 required-field">
                                <Form.Control ref={password} type="password" placeholder='Password' />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 required-field">
                                <Form.Control ref={username} type="text" placeholder='Username'  />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3 required-field">
                                <Form.Control ref={name} type="text" placeholder='Name' />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Surname" className="mb-3 required-field">
                                <Form.Control ref={surname} type="text" placeholder='Surname'  />
                            </FloatingLabel>
                        </Fade>
                    </div>
                    <div>
                        <Fade bottom cascade>
                            <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3 required-field">
                                <Form.Control ref={phone} type="text"   />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="Birthdate" className="mb-3 required-field">
                                <Form.Control ref={birthdate} type="date" />
                            </FloatingLabel>
                            <FormGroup controlId="floatingInput" label="Avatar" className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control ref={avatar} type="file" />
                            </FormGroup>
                            <FloatingLabel controlId="floatingInput" label="Motto" className="mb-3">
                            <Form.Control ref={motto} as="textarea"/>
                            </FloatingLabel>
                            <div className="d-flex align-items-center mt-4 justify-content-end ">
                    <Button type="submit" className="btn-primary me-3">Join Whith Us!</Button>
                </div>
                        </Fade>
                    </div>
                </div>
                
        </Form>

    )
}