import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  imageUrl: string;
  onClose: () => void;
}

function Modal({ imageUrl, onClose }: ModalProps) {
  return (
    <div className={styles.modalWindow}>
      <div className={styles.modalContent}>
        <img src={imageUrl} alt='modal-img' />
        <button type='button' className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
