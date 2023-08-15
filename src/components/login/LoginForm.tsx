import React from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import LoginButton from './LoginButton';
import classes from './LoginForm.module.css';

function LoginForm() {
  return (
    <form className={classes.form}>
      <EmailInput placeholder='Your Email' />
      <PasswordInput placeholder='Your Password' />
      <LoginButton />
    </form>
  );
}

export default LoginForm;
