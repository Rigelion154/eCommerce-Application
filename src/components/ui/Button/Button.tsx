import React from 'react';
import '../../../styles/buttons.css';
import { IButton } from '../../../types/types';

function Button({ children, styles }: IButton) {
  return (
    <button className={styles} type='button'>
      {children}
    </button>
  );
}

export default Button;
