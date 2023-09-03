import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/container/Container';
import ROUTES from '../routes/routes';
import RegistrationForm from '../components/ui/registartionForm/RegistrationForm';
import styles from './login/Login.module.css';

function Registration() {
  return (
    <section style={{ maxWidth: '380px', margin: '0 auto' }}>
      <Container>
        <h2 style={{ display: 'inline-block', marginTop: '30px' }}>Registration</h2>
        <RegistrationForm />
        <div className={styles.register__form}>
          <span>Have an account?</span>
          <Link to={ROUTES.LOGIN} className={styles.register__link}>
            Login
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Registration;
