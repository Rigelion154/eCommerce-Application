import React, { useState } from 'react';
import classes from './LoginForm.module.css';

function LoginForm() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailWarning, toggleEmailWarning] = useState(true);
  const [passwordWarning, togglePasswordWarning] = useState(true);
  const [showPassword, showHidePassword] = useState('password');

  function checkEmail(value: string) {
    const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.match(validRegex)) {
      toggleEmailWarning(false);
    } else {
      toggleEmailWarning(true);
    }
  }

  function checkPassword(value: string) {
    const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.match(validRegex)) {
      togglePasswordWarning(false);
    } else {
      togglePasswordWarning(true);
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
      <div>
        <input
          type='text'
          placeholder='Your e-mail'
          className={classes.input}
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value);
            checkEmail(e.target.value);
          }}
        />
        <span className={classes.invalid} hidden={emailWarning}>
          Incorrect e-mail. E-mail should have a name and domain, for example
          &quot;test@test.com&quot;.
        </span>
      </div>
      <div>
        <input
          type={showPassword}
          placeholder='Your password'
          className={classes.input}
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value);
            checkPassword(e.target.value);
          }}
        />
        <span className={classes.invalid} hidden={passwordWarning}>
          Incorrect password. Password must be at least 8 characters long, contain at least one
          uppercase letter, one lowercase letter and one digit.
        </span>
      </div>
      <button className={classes.btn} type='button' onClick={() => toggleShowPassword()}>
        Show password
      </button>
      <div>
        <button className={classes.btn} type='button'>
          Log in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
