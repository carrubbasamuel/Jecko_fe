import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';




export default function ProOfJecko() {
    return (
        <>
            <p className='main-text'>
                Ecco cosa rende Jecko unica:
            </p>


            <Row className='justify-content-center gap-2 mt-5'>
                <Col md={3}>
                    <ul className='point-list'>
                        <li className='list-item'>
                            <FaCheckCircle className='green-check-icon' /><p> <strong>Incontri Casuali e Socializzazione</strong>: Jecko mette in evidenza l'aspetto unico delle partite casuali e degli incontri inaspettati nei campi pubblici. Grazie a questa caratteristica, potrai incontrare nuovi amici e connetterti con persone che condividono la stessa passione per lo sport.</p>
                        </li>
                        <li className='list-item'>
                            <FaCheckCircle className='green-check-icon' /><p><strong>Diversità e Inclusività:</strong>  Nei campi pubblici, puoi aspettarti di giocare con persone di diverse età, background e livelli di abilità. Questa diversità rende le partite più interessanti e inclusiva, offrendo a tutti la possibilità di partecipare e imparare dagli altri.</p>
                        </li>
                    </ul>
                </Col>
                <Col md={3}>
                    <ul className='point-list'>
                        <li className='list-item'>
                            <FaCheckCircle className='green-check-icon' /><p><strong>Atmosfera di Comunità:</strong>  Jecko promuove un'atmosfera di comunità tra gli appassionati di sport. Sarai parte di una rete sportiva più ampia e avrai l'opportunità di condividere la tua passione con gli altri.</p>
                        </li>
                        <li className='list-item'>
                            <FaCheckCircle className='green-check-icon' /><p> <strong>Sorpresa e Spontaneità:</strong> Goditi l'elemento di sorpresa e spontaneità quando giochi nei campi pubblici. Le partite possono iniziare in qualsiasi momento, creando emozioni uniche e momenti indimenticabili.</p>
                        </li>
                    </ul>
                </Col>
                <Col md={3}>
                    <ul className='point-list'>

                        <li className='list-item'>
                            <FaCheckCircle className='green-check-icon' /><p> <strong>Condivisione di Conoscenze:</strong> Su Jecko, è incoraggiata la condivisione di conoscenze e competenze tra i giocatori. Puoi insegnare nuove tecniche, trucchi o strategie ai giocatori meno esperti, contribuendo a creare una cultura di apprendimento reciproco.</p>
                        </li>
                        <li className='list-item'>
                            <FaCheckCircle className='green-check-icon' /><p> <strong>Rispetto e Fair Play:</strong> Jecko promuove il rispetto e il fair play come valori fondamentali. Gli utenti sono incoraggiati a essere gentili e rispettosi con gli altri giocatori, creando un ambiente positivo e inclusivo.</p>
                        </li>
                    </ul>
                </Col>
            </Row>
        </>
    )
}