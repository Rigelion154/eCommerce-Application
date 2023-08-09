import React from 'react';
import { IChildren } from '../../types/types';

const Container = ({ children }: IChildren) => {
  return <div className='container'>{children}</div>;
};

export default Container;
