
import React, { useRef, useState } from 'react';
import { Button, FloatingLabel, Form, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import { fetchLogin, fetchSignup } from '../../redux/userReducer';
import ImageUploader from './avatar';

export default function FormSignup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const username = useRef(null);
    const name = useRef(null);
    const surname = useRef(null);
    const city = useRef(null);
    const birthdate = useRef(null);
    const avatarRef = useRef(null);
    const motto = useRef(null);

    const [citySuggestions, setCitySuggestions] = useState([]);
  
    const handleCityChange = async (e) => {
        const searchTerm = e.target.value;
        try {
            const response = await fetch(`https://api.example.com/cities?q=${searchTerm}`);
            const data = await response.json();
            setCitySuggestions(data); // Assumi che il formato della risposta sia un array di nomi di città
        } catch (error) {
            console.error('Errore durante la ricerca delle città:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email.current.value);
        formData.append('password', password.current.value);
        formData.append('username', username.current.value);
        formData.append('name', name.current.value);
        formData.append('surname', surname.current.value);
        formData.append('city', city.current.value);
        formData.append('birthdate', birthdate.current.value);
        formData.append('avatar', avatarRef.current.files[0]);
        formData.append('motto', motto.current.value);


        dispatch(fetchSingup(formData)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                dispatch(fetchLogin({ email: email.current.value, password: password.current.value })).then((res) => {
                    if (res.meta.requestStatus === 'fulfilled') {
                        navigate('/')
                    }
                })
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
            <Fade bottom cascade>
                <FormGroup controlId="floatingInput" label="Imagine di profilo" className="mb-5 d-flex justify-content-center">
                    <ImageUploader inputRef={avatarRef} />
                </FormGroup>
            </Fade>
            <div className='d-flex justify-content-center flex-md-row flex-column gap-md-5 mb-5 '>
                <div >
                    <Fade bottom cascade>

                        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3 required-field">
                            <Form.Control ref={email} type="email" placeholder='Email' />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Password" className="mb-3 required-field">
                            <Form.Control ref={password} type="password" placeholder='Password' />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Nome" className="mb-3 required-field">
                            <Form.Control ref={name} type="text" placeholder='Nome' />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Cognome" className="mb-3 required-field">
                            <Form.Control ref={surname} type="text" placeholder='Cognome' />
                        </FloatingLabel>
                    </Fade>
                </div>
                <div>
                    <Fade bottom cascade>
                        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 required-field">
                            <Form.Control ref={username} type="text" placeholder='Username' />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Città" className="mb-3 required-field">
                            <Form.Control 
                                ref={city} 
                                type="text" 
                                placeholder='Città'
                                list="citySuggestions" 
                                onChange={handleCityChange} 
                            />
                            <datalist id="citySuggestions">
                                {citySuggestions.map((suggestion, index) => (
                                    <option key={index} value={suggestion} />
                                ))}
                            </datalist>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Data di nascita" className="mb-3 required-field">
                            <Form.Control ref={birthdate} type="date" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingInput" label="Motto" className="mb-3">
                            <Form.Control ref={motto} as="textarea" />
                        </FloatingLabel>
                        <div className="d-flex align-items-center mt-4 justify-content-end ">
                            <Button type="submit" className="btn-primary me-3">Join With Us!</Button>
                        </div>
                    </Fade>
                </div>
            </div>
        </Form>
    )
}
