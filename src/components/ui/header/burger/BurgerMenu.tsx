import React, { useState } from 'react';
import './burger-menu.css';

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`burgerMenu ${isOpen ? 'open' : ''}`}>
      <button type='button' className='burgerMenu__bar' onClick={handleToggle}>
        <div className='burgerMenu__bar-line' />
        <div className='burgerMenu__bar-line' />
        <div className='burgerMenu__bar-line' />
      </button>

      <div className='burgerMenu__content'>{/* Здесь разместите свои пункты меню */}</div>
    </div>
  );
}

export default BurgerMenu;
