import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/container/Container';
import ROUTES from '../routes/routes';
import RegistrationForm from '../components/ui/registartionForm/RegistrationForm';

function Registration() {
  return (
    <section>
      <Container>
        <h2>Registration</h2>
        <p>
          Есть аккаунт?{' '}
          <Link className='button' to={ROUTES.LOGIN}>
            Login
          </Link>
        </p>
        <RegistrationForm />
      </Container>
    </section>
  );
}

export default Registration;
