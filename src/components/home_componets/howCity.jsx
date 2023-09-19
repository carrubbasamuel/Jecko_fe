import Firenze from '../../asset/firenze.png';
import Milano from '../../asset/milano.png';
import Roma from '../../asset/roma.png';
import './style.css';


export default function HowCity() {
    return (
        <div id='howCity'>
        <h2>Dove puoi trovarci? 🗺️</h2>
        <p className='fs-5'>Al momento ci troviamo solo in alcune delle piu grandi città italiane ma siamo una realtà in continua espansione...</p>
        <div className="container-city">
            <div className="city">
                <h4>Roma</h4>
                <img src={Roma} alt="Roma" />
            </div>
            <div className="city">
                <h4>Milano</h4>
                <img src={Milano} alt="Milano" />
           </div>
              <div className="city">
                <h4>Firenze</h4>
                <img src={Firenze} alt="Firenze" />
                </div> 
        </div>
        </div>
    )
}