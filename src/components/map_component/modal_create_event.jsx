import { Modal, Form, Button } from "react-bootstrap"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCreateEvent } from "../../redux/eventReducer";
import { toast } from "react-toastify";


export default function ModalCreateEvent({showModal, setShowModal, field}){
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        dateStart: '',
        dateEnd: '',
        location: field._id,
        description: '',
    });


    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'dateStart' || name === 'dateEnd') {
            if(name === 'dateStart') {
                const currentDate = new Date();
                const selectedDate = new Date(value);
                if (selectedDate < currentDate) {
                    toast.warn('Non puoi selezionare una data antecedente a quella attuale');
                    return;
                }
            }
            if (name === 'dateEnd') {
                const currentDate = new Date();
                const selectedDate = new Date(value);
                const timeDiff = Math.abs(selectedDate - new Date(formData.dateStart));
                const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));

                if (selectedDate < currentDate) {
                    toast.warn('Non puoi selezionare una data antecedente a quella di inizio');
                    return;
                } else if (name === 'dateEnd' && hoursDiff > 3) {
                    toast.warn('La prenotazione non può durare più di 3 ore');
                    return;
                }
            }
        }


        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleCreateEvent = () => {
        dispatch(fetchCreateEvent(formData));
        setShowModal(false);
    }


    return (
        <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea un nuovo evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="dateStart">
                            <Form.Label>Data e ora di inizio:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateStart"
                                value={formData.dateStart}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="dateEnd">
                            <Form.Label>Data e ora di fine:</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="dateEnd"
                                value={formData.dateEnd}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Descrizione:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={handleCreateEvent}>
                        Crea Evento
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}