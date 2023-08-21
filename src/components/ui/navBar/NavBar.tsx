import React, { useContext } from 'react';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAppRegistration } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import ROUTES from '../../../routes/routes';
import styles from './NavBar.module.css';
import AuthContext from '../../../core/utils/authContext';

function NavBar() {
  const { setIsAuth } = useContext(AuthContext);

  const links = [
    { id: 1, name: 'Sign up', path: ROUTES.REGISTRATION, icon: <MdAppRegistration /> },
    { id: 2, name: 'Profile', path: ROUTES.PROFILE, icon: <CgProfile /> },
    { id: 3, name: 'Sign in', path: ROUTES.LOGIN, icon: <AiOutlineLogin /> },
    {
      id: 4,
      name: 'Sign out',
      path: ROUTES.HOME,
      icon: <AiOutlineLogout />,
      callback: () => {
        localStorage.setItem('isAuth', '');
        setIsAuth(localStorage.getItem('isAuth'));
      },
    },
    { id: 5, name: 'Cart', path: ROUTES.CART, icon: <AiOutlineShoppingCart /> },
  ];

  return (
    <nav className={styles.nav}>
      {links.map((link) => (
        <div className={styles.nav__item} key={link.id}>
          <Link className={styles.nav__link} to={link.path} onClick={link.callback}>
            {link.icon}
          </Link>
          <p className={styles.nav__description}>{link.name}</p>
        </div>
      ))}
    </nav>
  );
}

export default NavBar;
