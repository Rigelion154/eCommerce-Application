import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiFillApi, AiOutlineLaptop } from 'react-icons/ai';
import { GiSmartphone } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import Container from '../../layout/container/Container';
import handleResize from '../../../core/utils/handleResize';
import styles from './CategoryBar.module.css';
import getCategories from '../../../core/services/getCategories';

const links = [
  {
    id: 1,
    name: 'Smartphones',
    path: '/categories/smartphones',
    icon: <GiSmartphone />,
  },
  {
    id: 2,
    name: 'Laptops',
    path: '/categories/laptops',
    icon: <AiOutlineLaptop />,
  },
  {
    id: 3,
    name: 'Gadgets',
    path: '/categories/gadgets',
    icon: <AiFillApi />,
  },
];

function CategoryBar({
  classes,
  burger,
  setBurger,
}: {
  classes: string;
  burger: boolean;
  setBurger: Dispatch<SetStateAction<boolean>>;
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    getCategories()
      .then(() => {})
      .catch(() => {});
    handleResize(setIsSmallScreen);
    window.addEventListener('resize', () => handleResize(setIsSmallScreen));
    return () => {
      window.removeEventListener('resize', () => handleResize(setIsSmallScreen));
    };
  }, []);

  return (
    <div className={classes}>
      <Container>
        <ul className={styles.items}>
          {links.map((link) => (
            <li key={link.id} className={styles.item__wrapper}>
              <Link
                to={link.path}
                className={styles.item}
                onClick={() => {
                  if (isSmallScreen) setBurger(!burger);
                }}
              >
                {link.name}
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default CategoryBar;
