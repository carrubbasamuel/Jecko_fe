
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchEventByLocation, setShowDetails } from '../redux/eventReducer';
import { setFieldSelected } from '../redux/locationReducer';


export default function useOpenFieldDetails() {
    const dispatch = useDispatch();
    const router = useLocation();
    const navigate = useNavigate();

    const handleOpenFieldDetails = async (field) => {
        if (router.pathname !== '/map') navigate('/map');
        dispatch(setShowDetails(false));
        await dispatch(setFieldSelected(field));
        await dispatch(fetchEventByLocation(field._id));
        dispatch(setShowDetails(true));
    }

    const handleCloseFieldDetails = () => {
        dispatch(setShowDetails(false));
    }

    return { handleOpenFieldDetails, handleCloseFieldDetails };

}


