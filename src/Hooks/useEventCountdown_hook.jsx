import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDelateEvent, fetchEventByLocation } from '../redux/eventReducer';
import { fetchLocation } from '../redux/locationReducer';

function useCountdown(endDate) {
  const dispatch = useDispatch();
  const field = useSelector(state => state.location.fieldSelected);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    if (!endDate) {
      setCountdown('Non ci sono eventi in programma');
      return;
    }

    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const eventDate = new Date(endDate);

      if (currentDate >= eventDate) {
        clearInterval(intervalId);
        setCountdown('L\'evento è terminato');
        setTimeout(() => {
          dispatch(fetchDelateEvent(field._id))
          dispatch(fetchEventByLocation(field._id))
          dispatch(fetchLocation())
        }, 3000);
      } else {
        const timeDiff = eventDate - currentDate;
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);



        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        setCountdown(`${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, endDate, field._id]);

  return countdown;
}

export default useCountdown;
