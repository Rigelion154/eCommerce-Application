import React from 'react';
import { IChildren } from '../../../types/types';

function Container({ children }: IChildren) {
  return <div className='container'>{children}</div>;
}

export default Container;
