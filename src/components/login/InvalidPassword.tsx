import React, { ComponentPropsWithoutRef } from 'react';
import classes from './Invalid.module.css';

function InvalidPassword({ ...props }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span hidden={props.hidden} className={classes.invalid}>
      Incorrect password. Password must be at least 8 characters long, contain at least one
      uppercase letter, one lowercase letter and one digit.
    </span>
  );
}

export default InvalidPassword;
