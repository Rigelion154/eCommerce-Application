import { useEffect } from 'react';

export default function useBurger(burger: boolean) {
  useEffect(() => {
    if (burger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [burger]);
}
