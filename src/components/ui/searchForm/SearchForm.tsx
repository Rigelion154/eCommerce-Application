import React from 'react';
import { SlMagnifier } from 'react-icons/sl';

import styles from './SearchForm.module.css';

function SearchForm() {
  return (
    <form className={styles.search__form}>
      <div className={styles.search__container}>
        <input className={styles.search__input} type='text' placeholder='Search from site' />
      </div>
      <button className='button' type='button'>
        <SlMagnifier />
      </button>
    </form>
  );
}

export default SearchForm;
