import React, { ComponentPropsWithoutRef } from 'react';
import classes from './PasswordBtn.module.css';

function PasswordHideButton({ ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <div>
      <button className={classes.btn} type='button' onClick={props.onClick}>
        Show/hide password
      </button>
    </div>
  );
}

export default PasswordHideButton;
