import React, { useEffect } from 'react';
import scrollHandler from '../services/infinityScroll/scrollHandler';

export default function useScrollEvent(setFetching: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    document.addEventListener('scroll', (e) => scrollHandler(e, setFetching));
    return function remove() {
      document.removeEventListener('scroll', (e) => scrollHandler(e, setFetching));
    };
  }, [setFetching]);
}
