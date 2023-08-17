import React from 'react';
import LoginButton from './LoginButton';
import classes from './LoginForm.module.css';
import EmailWrapper from './EmailWrapper';
import PasswordWrapper from './PasswordWrapper';

function LoginForm() {
  return (
    <form className={classes.form}>
      <EmailWrapper />
      <PasswordWrapper />
      <LoginButton />
    </form>
  );
}

export default LoginForm;
