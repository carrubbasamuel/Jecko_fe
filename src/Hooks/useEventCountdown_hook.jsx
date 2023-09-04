import { useEffect, useState } from 'react';

function useCountdown(endDate) {
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
      } else {
        const timeDiff = eventDate - currentDate;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown(`Termina tra: ${days} giorni, ${hours} ore, ${minutes} minuti, ${seconds} secondi`);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [endDate]);

  return countdown;
}

export default useCountdown;
