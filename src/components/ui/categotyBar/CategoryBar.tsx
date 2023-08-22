import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiFillApi, AiOutlineLaptop } from 'react-icons/ai';
import { GiSmartphone, GiTv } from 'react-icons/gi';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styles from './CategoryBar.module.css';
import Container from '../../layout/container/Container';

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

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const links = [
    {
      id: 1,
      name: 'TV',
      icon: <GiTv />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 2,
      name: 'Smartphones',
      icon: <GiSmartphone />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 3,
      name: 'Laptops',
      icon: <AiOutlineLaptop />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 4,
      name: 'Photo & Video',
      icon: <MdOutlinePhotoCamera />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
    {
      id: 5,
      name: 'Gadgets',
      icon: <AiFillApi />,
      callback: () => {
        if (isSmallScreen) setBurger(!burger);
      },
    },
  ];

  return (
    <div className={classes}>
      <Container>
        <ul className={styles.items}>
          {links.map((link) => (
            <li key={link.id} className={styles.item__wrapper}>
              <Link to='/' className={styles.item} onClick={link.callback}>
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
