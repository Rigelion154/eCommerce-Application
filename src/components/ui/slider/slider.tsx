import React, { useState } from 'react';
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
  const [currentImg, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={styles.slider__container}>
      <button type='button' onClick={goToPreviousSlide}>
        Prev
      </button>
      <div className={styles.slider__img_block}>
        <img src={images[currentImg].url} alt={`Изображение ${currentImg + 1}`} />
      </div>
      <button type='button' onClick={goToNextSlide}>
        Next
      </button>
    </div>
  );
}

export default Slider;
