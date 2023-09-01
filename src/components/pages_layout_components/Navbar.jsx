import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../redux/userReducer';

export default function NavbarMenu() {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])


  return (
    <div className='mynav'>
        <h1>Navbar</h1>
    </div>
  );
}

