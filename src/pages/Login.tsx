import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/container/Container';
import ROUTES from '../routes/routes';
import LoginForm from '../components/login/LoginForm';
import LoginSection from '../components/layout/login/LoginSection';

function Login() {
  return (
    <section>
      <Container>
        <LoginSection>
          <LoginForm />
          <span>
            Don&apos;t have an account?
            <Link to={ROUTES.REGISTRATION}> Register</Link>
          </span>
        </LoginSection>
      </Container>
    </section>
  );
}

export default Login;
