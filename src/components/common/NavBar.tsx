import '../../styles/layout/nav.css';
import React from 'react';
import { AiOutlineLogin, AiOutlineShoppingCart } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes/routes';

const links = [
  { id: 1, name: 'Login', path: ROUTES.LOGIN, icon: <AiOutlineLogin /> },
  { id: 2, name: 'Favorites', path: ROUTES.FAVORITES, icon: <MdFavoriteBorder /> },
  { id: 3, name: 'Cart', path: ROUTES.CART, icon: <AiOutlineShoppingCart /> },
];

const NavBar = () => {
  return (
    <nav className='nav'>
      {links.map((link) => (
        <div className='nav__item' key={link.id}>
          <Link className='nav__link' to={link.path}>
            {link.icon}
          </Link>
          <p className='nav__description'>{link.name}</p>
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
