

import React from 'react';
import LayoutPages from '../Layout/LayoutPages';
import logo from '../asset/jecko_logo.png';
import ProOfJecko from '../components/home_componets/pro_of_jecko';




export default function Home() {
    return (
        <LayoutPages>
            <main className='main-home d-flex flex-column justify-content-start align-items-center'>
                <div className='headerlogo'>
                    <img src={logo} alt='logo' width={500} height={500} />
                </div>

                <p className='main-text'>
                    Benvenuti su Jecko, la tua piattaforma per mettere in contatto gli amanti dello sport in cerca di partite emozionanti nei campetti pubblici della tua città! Con Jecko, non dovrai più preoccuparti di organizzare partite con gli amici o di cercare compagni di gioco. Siamo qui per semplificarti la vita e rendere l'organizzazione delle tue partite più facile che mai.
                </p>
                
                
                <ProOfJecko />

                {/* <CarouselOfJecko /> */}


                <p className='main-text mt-4'>
                    Con Jecko, non si tratta solo di giocare a basket e calcio; si tratta di condividere esperienze, creare connessioni significative e celebrare la bellezza dello sport all'aria aperta. Sii parte di questa avventura sportiva unica e unisciti a noi su Jecko!
                </p>
            </main>
        </LayoutPages>

    )
}