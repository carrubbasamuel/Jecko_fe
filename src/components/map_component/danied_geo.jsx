
import noGeo from './nogeo.png'
export default function DaniedGeolocation() {
    
    return (
        <div className='d-flex justify-content-center align-items-center flex-column h-100'>
            
            <img src={noGeo} alt='noGeo' height={50} width={50} className='mb-4'/>
            <h1 className='text-center'>Geolocalizzazione non disponibile</h1>
            <p className='text-center'>Per poter utilizzare Jecko è necessario abilitare la geolocalizzazione</p>


        </div>
    )
    
}