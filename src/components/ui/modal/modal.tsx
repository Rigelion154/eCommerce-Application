import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Modal.module.css';

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

function Modal({ imageUrl, onClose }: ModalProps) {
  return (
    <div className={styles.modal__window}>
      <div className={styles.modal__content}>
        <img src={imageUrl} alt='modal-img' />
        <button type='button' className={styles.close__btn} onClick={onClose}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}

export default Modal;
