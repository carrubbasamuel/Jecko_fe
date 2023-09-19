import { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { AiFillHome } from 'react-icons/ai';
import { FaMapMarked } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../asset/jecko_logo.png';
import { fetchProfile } from '../../redux/userReducer';
import ChatList from '../chat_component/chat_list';
import './style.css';


export default function NavbarMenu() {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.user)
  const {notReadMessage} = useSelector(state => state.chat)


  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])


  return (
    <nav id='menu' className='shadow menu-container '>

      <div className="d-flex flex-column justify-content-center align-items-center p-0">
        <Image width={120} height={120} src={logo} alt='logo' />
        <Link to={"/"}>
          <AiFillHome size={30} />
        </Link>
        <Link to={"/map"}>
          <FaMapMarked size={30} />
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center p-0 flex-column">
        <div className='chaticon'>
          {notReadMessage && notReadMessage.length>0 && <div id='notReadMessage' className='active'>{notReadMessage.length}</div>}
            <ChatList />
        </div>

        <Link id='avatar' to={"/profile"}>
          <Image src={profile?.avatar} alt='avatar' roundedCircle width={50} height={50} />
          <div className='status'></div>
        </Link>
      </div>

    </nav>


  );
}

