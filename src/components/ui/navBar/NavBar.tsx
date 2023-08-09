import React from 'react';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdAppRegistration } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import ROUTES from '../../../routes/routes';
import styles from './NavBar.module.css';
import useAuth from '../../../core/hooks/useAuth';

function NavBar() {
  const { auth, handleLogout, handleLogin } = useAuth();

  const links = [
    { id: 1, name: 'Registration', path: ROUTES.REGISTRATION, icon: <MdAppRegistration /> },
    { id: 2, name: 'Profile', path: ROUTES.PROFILE, icon: <CgProfile /> },
    { id: 3, name: 'Login', path: ROUTES.LOGIN, icon: <AiOutlineLogin />, callback: handleLogin },
    { id: 4, name: 'Logout', path: ROUTES.HOME, icon: <AiOutlineLogout />, callback: handleLogout },
    { id: 5, name: 'Cart', path: ROUTES.CART, icon: <AiOutlineShoppingCart /> },
  ];

  const filteredLinks = auth
    ? links.filter((link) => link.id !== 1 && link.id !== 3)
    : links.filter((link) => link.id !== 2 && link.id !== 4);

  return (
    <nav className={styles.nav}>
      {filteredLinks.map((link) => (
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
