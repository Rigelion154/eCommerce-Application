import React from 'react';
import classes from './LogintBtn.module.css';

function LoginButton() {
  return (
    <button type='submit' className={classes.btn}>
      Log in
    </button>
  );
}

export default LoginButton;
