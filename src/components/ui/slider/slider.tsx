import React, { useState, useRef } from 'react';
import styles from './Slider.module.css';

interface Image {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
}

interface ImageList {
  images: Image[];
}

function Slider({ images }: ImageList) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderBlockRef = useRef<HTMLDivElement | null>(null);

  const goToPrevSlide = () => {
    if (sliderBlockRef.current) {
      const slideWidth = sliderBlockRef.current.clientWidth / images.length;
      setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      sliderBlockRef.current.scrollLeft -= slideWidth;
    }
  };

  const goToNextSlide = () => {
    if (sliderBlockRef.current) {
      const slideWidth = sliderBlockRef.current.clientWidth / images.length;
      setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      sliderBlockRef.current.scrollLeft += slideWidth;
    }
  };

  return (
    <div className={styles.slider__container}>
      <button type='button' onClick={goToPrevSlide}>
        Prev
      </button>
      <div className={styles.slider__block} ref={sliderBlockRef}>
        {images.map((image, index) => (
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            src={image.url}
            alt={`Slide ${index}`}
            className={`${styles.slider__img} ${index === activeIndex ? styles.activeSlide : ''}`}
          />
        ))}
      </div>
      <button type='button' onClick={goToNextSlide}>
        Next
      </button>
    </div>
  );
}

export default Slider;
