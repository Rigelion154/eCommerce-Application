import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import LoginForm from '../../components/login/LoginForm';
import LoginSection from '../../components/layout/login/LoginSection';
import ROUTES from '../../routes/routes';
import styles from './Login.module.css';

function Login() {
  return (
    <section>
      <Container>
        <LoginSection>
          <LoginForm />
          <div className={styles.register__form}>
            <span>Don&apos;t have an account?</span>
            <Link to={ROUTES.REGISTRATION} className={styles.register__link}>
              Register
            </Link>
          </div>
        </LoginSection>
      </Container>
    </section>
  );
}

export default Login;
