import React from 'react';
import { Fade } from 'react-reveal';
import Firenze from '../../asset/firenze.png';
import Milano from '../../asset/milano.png';
import Roma from '../../asset/roma.png';
import './style.css';

export default function HowCity() {
    return (
        <Fade bottom>
        <div id='howCity'>
            <Fade bottom>
                <h2>Dove puoi trovarci? 🗺️</h2>
            </Fade>
            <Fade bottom>
                <p className='fs-5'>Al momento ci troviamo solo in alcune delle piu grandi città italiane ma siamo una realtà in continua espansione...</p>
            </Fade>
            <div className="container-city">
                <Fade bottom>
                    <div className="city">
                        <h4>Roma</h4>
                        <img src={Roma} alt="Roma" />
                    </div>
                </Fade>
                <Fade bottom>
                    <div className="city">
                        <h4>Milano</h4>
                        <img src={Milano} alt="Milano" />
                    </div>
                </Fade>
                <Fade bottom>
                    <div className="city">
                        <h4>Firenze</h4>
                        <img src={Firenze} alt="Firenze" />
                    </div>
                </Fade>
            </div>
        </div>
        </Fade>
    )
}
