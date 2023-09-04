import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const galleryBlockRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (images.length > 3) {
      setShowControls(true);
    } else {
      setShowControls(false);
    }
  }, [activeSlideIndex, images, showControls]);

  const changeSlide = (index: number) => {
    if (galleryBlockRef.current) {
      const galleryBtn = galleryBlockRef.current.querySelector(`.${styles.gallery__button}`);
      const slideWidth = galleryBtn ? galleryBtn.getBoundingClientRect().width : 0;
      setActiveSlideIndex(index);
      galleryBlockRef.current.scrollLeft = slideWidth * index;
    }
  };

  return (
    <div className={isModalOpen ? styles.modal__wrapper : ''}>
      <div
        className={
          isModalOpen
            ? `${styles.slider__container} ${styles.slider__modal_open}`
            : styles.slider__container
        }
      >
        {isModalOpen && (
          <button
            className={isModalOpen ? styles.modal__close : ''}
            type='button'
            onClick={() => setModalOpen(false)}
          >
            <AiOutlineCloseCircle size={30} />
          </button>
        )}
        <button
          type='button'
          className={
            isModalOpen
              ? `${styles.main__img_block} ${styles.modal__image}`
              : styles.main__img_block
          }
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <img src={images[activeSlideIndex].url} alt='img' />
        </button>
        {images.length > 1 && (
          <div
            className={
              isModalOpen
                ? `${styles.slider__block} ${styles.modal__sliderbar}`
                : styles.slider__block
            }
          >
            <button
              className={styles.slider__prev_btn}
              style={{ display: !showControls ? 'none' : 'block' }}
              type='button'
              onClick={() =>
                changeSlide(activeSlideIndex === 0 ? images.length - 1 : activeSlideIndex - 1)
              }
            >
              &lt;
            </button>
            <div
              className={
                isModalOpen
                  ? `${styles.gallery__block} ${styles.gallery__block_modal}`
                  : styles.gallery__block
              }
              ref={galleryBlockRef}
              style={{ overflowX: !showControls ? 'hidden' : 'scroll' }}
            >
              {images.map((image, index) => (
                <button
                  type='button'
                  key={image.url}
                  onClick={() => changeSlide(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      changeSlide(index);
                    }
                  }}
                  className={`${styles.gallery__button} ${
                    index === activeSlideIndex ? styles.activeSlide : ''
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Slide-${index}`}
                    className={
                      isModalOpen
                        ? `${styles.gallery__img} ${styles.gallery__img_modal}`
                        : styles.gallery__img
                    }
                  />
                </button>
              ))}
            </div>
            <button
              className={styles.slider__next_btn}
              style={{ display: !showControls ? 'none' : 'block' }}
              type='button'
              onClick={() => changeSlide((activeSlideIndex + 1) % images.length)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Slider;
