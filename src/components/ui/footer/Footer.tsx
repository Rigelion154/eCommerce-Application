import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/rs_school_js.svg';
import styles from './Footer.module.css';
import Container from '../../layout/container/Container';

function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.footer__wrapper}>
          <Link to='/about-us'>About us</Link>
          <a href='https://rs.school/'>
            <img src={logo} alt='RSSchool logo' className={styles.footer__logo} />
          </a>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
