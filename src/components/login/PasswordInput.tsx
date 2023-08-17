import React, { ComponentPropsWithoutRef } from 'react';
import classes from './LoginInputs.module.css';

function PasswordInput({ ...props }: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={classes.input}
      onChange={props.onChange}
    />
  );
}

export default PasswordInput;
