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

  const goToSlide = (index: number) => {
    if (imagesBlockRef.current) {
      const slideWidth = imagesBlockRef.current.clientWidth / images.length;
      setActiveIndex(index);
      imagesBlockRef.current.scrollLeft = slideWidth * index;
    }
  };

  return (
    <div className={styles.slider__container}>
      <div className={styles.main__img_block}>
        <img src={images[activeIndex].url} alt='img' />
      </div>
      <div className={styles.slider__block}>
        <button
          type='button'
          onClick={() => goToSlide(activeIndex === 0 ? images.length - 1 : activeIndex - 1)}
        >
          Prev
        </button>
        <div className={styles.images__block} ref={imagesBlockRef}>
          {images.map((image, index) => (
            <button
              type='button'
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => goToSlide(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  goToSlide(index);
                }
              }}
              className={`${styles.slider__button} ${
                index === activeIndex ? styles.activeSlide : ''
              }`}
            >
              <img src={image.url} alt={`Slide-${index}`} className={styles.slider__img} />
            </button>
          ))}
        </div>
        <button type='button' onClick={() => goToSlide((activeIndex + 1) % images.length)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Slider;
