import React from 'react';
import { Link } from 'react-router-dom';
import { MdSort } from 'react-icons/md';
import styles from './Header.module.css';

import NavBar from '../navBar/NavBar';
import SearchForm from '../searchForm/SearchForm';
import Container from '../../layout/container/Container';
import CategoryBar from '../categotyBar/CategoryBar';

function Header() {
  return (
    <header>
      <Container>
        <div className={styles.header}>
          <Link to='/'>
            <h1 className={styles.header__logo}>Online Store</h1>
          </Link>

          <button className={`button ${styles.button__category}`} type='button'>
            <MdSort />
            Category
          </button>

          <SearchForm />

          <NavBar />
        </div>
      </Container>
      <CategoryBar />
    </header>
  );
}

export default Header;
