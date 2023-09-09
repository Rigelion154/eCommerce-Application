import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/rs_school_js.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <Link to='/about-us'>About us</Link>
      <a href='https://rs.school/'>
        <img src={logo} alt='RSSchool logo' className={styles.logo} />
      </a>
    </div>
  );
}

export default Footer;
