import React from 'react';
import { Link } from 'react-router-dom';
import { MdSort } from 'react-icons/md';
import styles from '../../styles/layout/Header.module.css';

import NavBar from '../common/NavBar';
import Button from '../ui/Button/Button';
import SearchForm from '../common/search-form/SearchForm';
import Container from './Container';
import CategoryBar from '../common/categoty-bar/CategoryBar';

const Header = () => {
  return (
    <header>
      <Container>
        <div className={styles.header}>
          <Link to='/' className='header__logo'>
            <h1>Online Store</h1>
          </Link>

          <Button styles='button button__fill button__category'>
            <MdSort />
            Category
          </Button>

          <SearchForm />

          <NavBar />
        </div>
      </Container>
      <CategoryBar />
    </header>
  );
};

export default Header;
