import React from 'react';
import { AiFillApi, AiOutlineLaptop } from 'react-icons/ai';
import { GiSmartphone, GiTv } from 'react-icons/gi';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { Link } from 'react-router-dom';

import styles from './CategoryBar.module.css';
import Container from '../../layout/container/Container';

const links = [
  { id: 1, name: 'TV', icon: <GiTv /> },
  { id: 2, name: 'Smartphones', icon: <GiSmartphone /> },
  { id: 3, name: 'Laptops', icon: <AiOutlineLaptop /> },
  { id: 4, name: 'Photo & Video', icon: <MdOutlinePhotoCamera /> },
  { id: 5, name: 'Gadgets', icon: <AiFillApi /> },
];

function CategoryBar() {
  return (
    <div className={styles.container}>
      <Container>
        <ul className={styles.items}>
          {links.map((link) => (
            <li key={link.id} className={styles.item__wrapper}>
              <Link to='/' className={styles.item}>
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
