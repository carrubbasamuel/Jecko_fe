import decode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PROTECTED_ROUTE({ element }) {
    const token = useSelector(state => state.user.user_token);


    if (token) {
        const { exp } = decode(token);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() <= expirationTime) {
            return element
        } else {
            return <Navigate to="/login" />
        }
    }else{
        return <Navigate to="/login" />
    }
}
