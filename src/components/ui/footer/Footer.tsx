import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <Link to='/'>About us</Link>
      <div className={styles.logo} />
    </div>
  );
}

export default Footer;
