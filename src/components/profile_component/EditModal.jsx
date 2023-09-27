import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDelateUser, fetchPatchUser } from '../../redux/userReducer';

export default function EditModal({ show, handleClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.user.profile)
    const [formData, setFormData] = useState({
        username: userData.username || '',
        name: userData.name || '',
        surname: userData.surname || '',
        city: userData.city || '',
        motto: userData.motto || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        dispatch(fetchPatchUser(formData))
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modifica il tuo profilo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Modifica alcuni campi del tuo profilo, cambia il motto o cambia l'username
                </p>
                <hr />
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formSurname">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cognome"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCity">
                        <Form.Label>Città</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Città"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </Form.Group>


                    <Form.Group controlId="formMotto">
                        <Form.Label>Motto</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Motto"
                            name="motto"
                            value={formData.motto}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
                    <Modal.Title className='mt-3'>Vuoi eliminare il tuo profilo?</Modal.Title>
                <p className='text-muted p-2'>
                    Sei sicuro di voler eliminare il tuo profilo? Questa azione è irreversibile.
                    Verrano eliminati tutti i tuoi dati e non potrai più accedere al tuo profilo.
                    inoltre verranno eliminati tutti gli eventi e le chat di cui sei amministratore.
                </p>
                <Button variant="danger" onClick={() => dispatch(fetchDelateUser()).then(() => navigate('/login'))}>
                    Elimina il tuo profilo
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salva Modifiche
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
