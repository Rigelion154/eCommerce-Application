import React, { ComponentPropsWithoutRef } from 'react';
import classes from './LoginInputs.module.css';

function PasswordInput({ placeholder }: ComponentPropsWithoutRef<'input'>) {
  return <input type='text' placeholder={placeholder} className={classes.input} />;
}

export default PasswordInput;
