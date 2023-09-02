import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle, AiOutlineMenu } from 'react-icons/ai';
import styles from './Header.module.css';
import stylesCategory from '../categotyBar/CategoryBar.module.css';

import NavBar from '../navBar/NavBar';
import SearchForm from '../searchForm/SearchForm';
import Container from '../../layout/container/Container';
import CategoryBar from '../categotyBar/CategoryBar';

function Header() {
  const [burger, setBurger] = useState(false);

  useEffect(() => {
    if (burger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [burger]);

  return (
    <header>
      <Container>
        <div className={styles.header}>
          <Link to='/'>
            <h1 className={styles.header__logo}>Online Store</h1>
          </Link>
          <div
            className={
              burger ? [styles.header__items, styles.open_burger].join(' ') : styles.header__items
            }
          >
            <SearchForm burger={burger} setBurger={setBurger} />
            <NavBar burger={burger} setBurger={setBurger} />
          </div>
          <button type='button' className={styles.header__menu} onClick={() => setBurger(!burger)}>
            {burger ? <AiOutlineCloseCircle size={25} /> : <AiOutlineMenu size={25} />}
          </button>
        </div>
      </Container>
      <CategoryBar
        classes={
          burger
            ? [stylesCategory.container, stylesCategory.open_burger].join(' ')
            : stylesCategory.container
        }
        burger={burger}
        setBurger={setBurger}
      />
    </header>
  );
}

export default Header;
