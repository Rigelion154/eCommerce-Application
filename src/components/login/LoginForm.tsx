import React, { useState } from 'react';
import classes from './LoginForm.module.css';
import { IToken } from '../../types/types';

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

  async function getTokenByPassword(email: string, password: string) {
    const clientId = 'XY9PGkev5sywhdyjMj7HKjZd';
    const clientSecret = 'BnmkgevSHqy-EwuJr6WQdVSp7i_0cB7T';
    const authHost = 'us-central1.gcp.commercetools.com';
    const projectKey = 'commerce-shop';
    const scope = 'manage_my_profile:commerce-shop manage_customers:commerce-shop';
    const authUrl = `https://auth.${authHost}/oauth/${projectKey}/customers/token`;
    const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
    const authData = `grant_type=password&username=${email}&password=${password}&scope=${scope}`;
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: authData,
    });
    const token = await (response.json() as Promise<IToken>);
    console.log(token);
    if (response.ok) {
      const loginUrl = `https://api.${authHost}/${projectKey}/login`;
      const data = {
        email,
        password,
      };
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        localStorage.setItem('isAuth', 'True');
      }
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
        <button
          className={classes.btn}
          type='button'
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => getTokenByPassword(emailValue, passwordValue)}
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
