import { AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import Logo from '../../asset/jecko_logo.png';


export default function Footer() {
    return (
        <footer>
            <p className='text-center p-2'>Jecko | Via di Soffiano, 50 - 55045 Firenze (Toscana) ITALIA | C.F. ABC000000000 | P.Iva 000000000</p>
            <div>
                <a class="trans-color-text" href="#">info@jeko.it</a> | <span itemprop="telephone"><a href="#">+39 3274247298</a></span><br/>
            </div>
            
            <div>
                <a target="_blank" href="#"> Termini e Condizioni</a> | <a target="_blank" href="#"> Politiche sulla Privacy</a>
            </div>
                <div class="social-cont">
                    <ul class="social-list">
                        <li><a target="_blank" href="#"><BsFacebook size={30}/></a></li>
                        <li><a target="_blank" href="#"><AiFillInstagram size={30}/></a></li>
                        <li><a target="_blank" href="#"><AiFillLinkedin size={30}/></a></li>
                        <li><a target="_blank" href="#"><AiFillTwitterCircle size={30}/></a></li>
                    </ul>
                </div>

                Designed by
                <div class="credits">
                   <img width="200" src={Logo} title="#" alt="#"/>
                </div>
                <p class="text-center end-footer">© 2023 Jecko. All rights reserved.</p>
        </footer>
    )
}