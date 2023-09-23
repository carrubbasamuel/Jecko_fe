import decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchProfile } from './redux/userReducer';


export default function PROTECTED_ROUTE({ element }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.user_token);
    const profile = useSelector(state => state.user.profile);


    if (token) {
        const { exp } = decode(token);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() <= expirationTime) {
            if (!profile) dispatch(fetchProfile())
            return element
        } else {
            return <Navigate to="/login" />
        }
    }else{
        return <Navigate to="/login" />
    }
}
