import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/container/Container';
import ROUTES from '../routes/routes';

function Login() {
  return (
    <section>
      <Container>
        <h2>Здесь будет логин</h2>
        <p>
          Нет аккаунта?
          <Link className='button' to={ROUTES.REGISTRATION}>
            Register
          </Link>
        </p>
      </Container>
    </section>
  );
}

export default Login;
