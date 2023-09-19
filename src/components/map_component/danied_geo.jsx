
import Lottie from 'react-lottie'

export default function DaniedGeolocation() {
    const options={
        loop: true,
        autoplay: true,
        animationData: require('./danied.json'),
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column h-100'>
            <h3>Non possiamo geolocalizzarti se tu non vuoi! 😢</h3>
            <Lottie options={options} style={{
                width: '100%',
                height: '500px',
               
            }} />
        </div>
    )
    
}