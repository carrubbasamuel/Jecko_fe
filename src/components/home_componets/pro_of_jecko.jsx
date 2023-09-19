import React from 'react';
import { Col, Row } from 'react-bootstrap';




export default function ProOfJecko() {
    return (
        <>
            <p className='main-text fs-2 mt-5'>
                Ecco cosa rende Jecko unica 😁!
            </p>


            <Row className='justify-content-center gap-2 mt-5'>
                <Col md={3}>
                    <ul className='point-list'>
                        <li className='list-item'>
                            <p> <strong><h2>🤼</h2>Incontri Casuali e Socializzazione<br/></strong> Jecko mette in evidenza l'aspetto unico delle partite casuali e degli incontri inaspettati nei campi pubblici. Grazie a questa caratteristica, potrai incontrare nuovi amici e connetterti con persone che condividono la stessa passione per lo sport.</p>
                        </li>
                        <li className='list-item special'>
                            <p><strong><h2>🫴</h2>Diversità e Inclusività <br/></strong>  Nei campi pubblici, puoi aspettarti di giocare con persone di diverse età, background e livelli di abilità. Questa diversità rende le partite più interessanti e inclusiva, offrendo a tutti la possibilità di partecipare e imparare dagli altri.</p>
                        </li>
                    </ul>
                </Col>
                <Col md={3}>
                    <ul className='point-list'>
                        <li className='list-item '>
                            <p><strong><h2>🔮</h2>Atmosfera di Comunità <br/></strong>  Jecko promuove un'atmosfera di comunità tra gli appassionati di sport. Sarai parte di una rete sportiva più ampia e avrai l'opportunità di condividere la tua passione con gli altri.</p>
                        </li>
                        <li className='list-item special'>
                            <p> <strong><h2>🪄</h2>Sorpresa e Spontaneità <br/></strong> Goditi l'elemento di sorpresa e spontaneità quando giochi nei campi pubblici. Le partite possono iniziare in qualsiasi momento, creando emozioni uniche e momenti indimenticabili.</p>
                        </li>
                    </ul>
                </Col>
                <Col md={3}>
                    <ul className='point-list'>

                        <li className='list-item'>
                            <p> <strong><h2>💼</h2>Condivisione di Conoscenze<br/></strong> Su Jecko, è incoraggiata la condivisione di conoscenze e competenze tra i giocatori. Puoi insegnare nuove tecniche, trucchi o strategie ai giocatori meno esperti, contribuendo a creare una cultura di apprendimento reciproco.</p>
                        </li>
                        <li className='list-item special'>
                            <p> <strong><h2>🤝</h2>Rispetto e Fair Play <br/></strong> Jecko promuove il rispetto e il fair play come valori fondamentali. Gli utenti sono incoraggiati a essere gentili e rispettosi con gli altri giocatori, creando un ambiente positivo e inclusivo.</p>
                        </li>
                    </ul>
                </Col>
            </Row>
        </>
    )
}