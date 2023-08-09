import React from 'react';
import { GoTriangleDown } from 'react-icons/go';
import { SlMagnifier } from 'react-icons/sl';

import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';

import styles from './SearchForm.module.css';

const SearchForm = () => {
  return (
    <form className={styles.search__form}>
      <div className={styles.search__container}>
        <Button styles='button button__search'>
          Search <GoTriangleDown />
        </Button>
        <Input className={styles.search__input} type='text' placeholder='Search from site' />
      </div>
      <Button styles='button button__fill button__magnifier'>
        <SlMagnifier />
      </Button>
    </form>
  );
};

export default SearchForm;
