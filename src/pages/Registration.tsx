import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/container/Container';
import ROUTES from '../routes/routes';

function Registration() {
  return (
    <section>
      <Container>
        <h2>Здесь будет регистрация</h2>
        <p>
          Есть аккаунт?{' '}
          <Link className='button' to={ROUTES.LOGIN}>
            Login
          </Link>
        </p>
      </Container>
    </section>
  );
}

export default Registration;
