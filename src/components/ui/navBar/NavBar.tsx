import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAppRegistration } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';

import { INavLink } from '../../../types/types';

import ROUTES from '../../../routes/routes';

import useResize from '../../../core/hooks/useResize';
import AuthContext from '../../../core/utils/authContext';
import getAnonymousToken from '../../../core/services/getAnonymousToken';

import styles from './NavBar.module.css';

function NavBar({
  burger,
  setBurger,
}: {
  burger: boolean;
  setBurger: Dispatch<SetStateAction<boolean>>;
}) {
  const { setIsAuth } = useContext(AuthContext);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useResize(setIsSmallScreen);

  const links: INavLink[] = [
    {
      id: 1,
      name: 'Sign up',
      path: ROUTES.REGISTRATION,
      icon: <MdAppRegistration />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 2,
      name: 'Profile',
      path: ROUTES.PROFILE,
      icon: <CgProfile />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 3,
      name: 'Sign in',
      path: ROUTES.LOGIN,
      icon: <AiOutlineLogin />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 4,
      name: 'Sign out',
      path: ROUTES.HOME,
      icon: <AiOutlineLogout />,
      callback: () => {
        if (localStorage.getItem('isAuth')) {
          localStorage.setItem('isAuth', '');
          getAnonymousToken()
            .then((res) => {
              localStorage.setItem('accessToken', res.accessToken);
              localStorage.setItem('refreshToken', res.refreshToken);
              localStorage.setItem('cartId', '');
            })
            .catch(() => {});
          setIsAuth(localStorage.getItem('isAuth'));
        }
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 5,
      name: 'Cart',
      path: ROUTES.CART,
      icon: <AiOutlineShoppingCart />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
  ];

  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <Link
          className={isHome && !burger ? styles.nav__item_home : styles.nav__item}
          key={link.id}
          to={link.path}
          onClick={link.callback}
        >
          <span className={styles.nav__link}>{link.icon}</span>
          <p className={styles.nav__description}>{link.name}</p>
        </Link>
      ))}
    </nav>
  );
}

export default NavBar;
