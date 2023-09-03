import { useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { AiFillHome } from 'react-icons/ai';
import { FaMapMarked } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../asset/jecko_logo.png';
import { fetchProfile } from '../../redux/userReducer';
import { Link } from 'react-router-dom';


export default function NavbarMenu() {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [dispatch])


  return (
    <>

      <div className="d-flex flex-column justify-content-center align-items-center p-0 ">
        <Image width={100} height={100} src={logo} alt='logo' />
        <Link to={"/"}>
          <AiFillHome className='mt-3' size={30} />
        </Link>
        <Link to={"/map"}>
          <FaMapMarked className='mt-3' size={30} />
        </Link>
      </div>

      <div className="d-flex justify-content-center align-items-center p-0 ">
        <Image src={profile?.avatar} alt='avatar' roundedCircle width={100} height={100} />
      </div>

    </>


  );
}

