import React from 'react';
import classes from './LoginLayout.module.css';
import { IChildren } from '../../../types/types';

function LoginSection({ children }: IChildren) {
  return <div className={classes.login}>{children}</div>;
}

export default LoginSection;
