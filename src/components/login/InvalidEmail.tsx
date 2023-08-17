import React, { ComponentPropsWithoutRef } from 'react';
import classes from './Invalid.module.css';

function InvalidEmail({ ...props }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span hidden={props.hidden} className={classes.invalid}>
      Incorrect e-mail. E-mail should have a name and domain, for example &quot;test@test.com&quot;.
    </span>
  );
}

export default InvalidEmail;
