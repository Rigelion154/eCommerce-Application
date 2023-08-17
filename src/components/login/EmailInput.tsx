import React, { ComponentPropsWithoutRef } from 'react';
import classes from './LoginInputs.module.css';

function EmailInput({ ...props }: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      type='text'
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={classes.input}
    />
  );
}

export default EmailInput;
