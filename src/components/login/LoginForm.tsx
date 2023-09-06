import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LoginForm.module.css';
import AuthContext from '../../core/utils/authContext';
import tryLogIn from '../../core/utils/tryLogin';

function LoginForm() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailWarning, toggleEmailWarning] = useState('');
  const [passwordWarning, togglePasswordWarning] = useState('');
  const [showPassword, showHidePassword] = useState('password');
  const [logInError, showLogInError] = useState(true);
  const { setIsAuth } = useContext(AuthContext);

  function checkEmail(value: string) {
    toggleEmailWarning('');
    const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (value === '') {
      toggleEmailWarning('E-mail is required');
    } else if (value !== value.trim()) {
      toggleEmailWarning('Please delete whitespaces at the beginning and/or end of e-mail');
    } else if (!value.match(validRegex)) {
      toggleEmailWarning(
        `Incorrect e-mail. E-mail should have a name and domain, for example: 'test@test.com'`,
      );
    }
  }

  function checkPassword(value: string) {
    togglePasswordWarning('');
    if (value.length < 8) {
      togglePasswordWarning('Password should be at least 8 characters long');
    }
    if (!/[A-Z]/.test(value)) {
      togglePasswordWarning('Password should contain at least one uppercase letter (A-Z)');
    }
    if (!/[a-z]/.test(value)) {
      togglePasswordWarning('Password should contain at least one lowercase letter (a-z)');
    }
    if (!/[0-9]/.test(value)) {
      togglePasswordWarning('Password should contain at least one digit (0-9)');
    }
    if (value.trim() !== value) {
      togglePasswordWarning('Password should not have leading or trailing spaces');
    }
    if (value === '') {
      togglePasswordWarning('Password is required');
    }
  }

  function toggleShowPassword() {
    if (showPassword === 'password') {
      showHidePassword('text');
    } else {
      showHidePassword('password');
    }
  }

  return (
    <form className={classes.form}>
      <div className={classes.inputWrapper}>
        <input
          name='asda'
          type='text'
          placeholder='Your e-mail'
          className={classes.input}
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
            checkEmail(e.target.value);
          }}
        />
        <span className={classes.invalid}>{emailWarning}</span>
      </div>
      <div className={classes.inputWrapper}>
        <input
          name='aasdsda'
          type={showPassword}
          placeholder='Your password'
          className={classes.input}
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value);
            checkPassword(e.target.value);
          }}
        />
        <span className={classes.invalid}>{passwordWarning}</span>
      </div>
      <button className={classes.passwordbtn} type='button' onClick={() => toggleShowPassword()}>
        {showPassword === 'text' ? 'Hide password' : 'Show password'}
      </button>
      <div>
        <button
          className={classes.btn}
          type='button'
          onClick={() => {
            if (emailValue && passwordValue) {
              tryLogIn(
                emailValue,
                passwordValue,
                showLogInError as Dispatch<SetStateAction<string | boolean>>,
                navigate,
              )
                .then(() => {
                  setIsAuth(localStorage.getItem('isAuth'));
                })
                .catch((error: string) => {
                  throw new Error(error);
                });
            } else {
              if (!emailValue) toggleEmailWarning('Field is empty');
              if (!passwordValue) togglePasswordWarning('Field is empty');
            }
          }}
        >
          Sign in
        </button>
      </div>
      <p style={{ color: 'red', fontSize: '1.5rem' }} hidden={logInError}>
        Wrong e-mail and/or password.
      </p>
    </form>
  );
}

export default LoginForm;
