import React, { useEffect, useRef, useState } from 'react';
import carouselJSON from './imageCarousel.json';
import './style.css';

export default function CarouselOfJecko() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1);
  const [lastScrollDirection, setLastScrollDirection] = useState(1);
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const scrollWidth = carousel.scrollWidth - carousel.clientWidth;

    const interval = setInterval(() => {
      if (scrollDirection === 1 && scrollPosition >= scrollWidth) {
        setScrollDirection(-1);
        setLastScrollDirection(-1); 
      } else if (scrollDirection === -1 && scrollPosition <= 0) {
        setScrollDirection(1);
        setLastScrollDirection(1); 
      }

      setScrollPosition(prevPos => prevPos + scrollDirection);
    }, 20);

    return () => clearInterval(interval);
  }, [scrollPosition, scrollDirection]);

  const handleMouseOver = () => {
    setScrollDirection(0);
  };

  const handleMouseOut = () => {
    setScrollDirection(lastScrollDirection);
  };

  return (
    <div id='carousel' className='container-carousel mt-5 mb-4'>
      <div className='carousel-container'>
        <ul ref={carouselRef} className='carouselJecko' style={{ transform: `translateX(${-scrollPosition}px)`, animationFillMode: 'forwards' }}>
          {carouselJSON.map((item, index) => (
            <li key={index} className='itemCarousel' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <img src={item.image} alt={item.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
