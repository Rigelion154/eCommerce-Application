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
  const imagesBlockRef = useRef<HTMLDivElement | null>(null);

  const goToPrevSlide = () => {
    if (imagesBlockRef.current) {
      const slideWidth = imagesBlockRef.current.clientWidth / images.length;
      setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      imagesBlockRef.current.scrollLeft -= slideWidth;
    }
  };

  const goToNextSlide = () => {
    if (imagesBlockRef.current) {
      const slideWidth = imagesBlockRef.current.clientWidth / images.length;
      setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      imagesBlockRef.current.scrollLeft += slideWidth;
    }
  };

  return (
    <div className={styles.slider__container}>
      <div className={styles.main__img_block}>
        <img src={images[0].url} alt='img' />
      </div>
      <div className={styles.slider__block}>
        <button type='button' onClick={goToPrevSlide}>
          Prev
        </button>
        <div className={styles.images__block} ref={imagesBlockRef}>
          {images.map((image, index) => (
            <img
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              src={image.url}
              alt={`Slide-${index}`}
              className={`${styles.slider__img} ${index === activeIndex ? styles.activeSlide : ''}`}
            />
          ))}
        </div>
        <button type='button' onClick={goToNextSlide}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Slider;
