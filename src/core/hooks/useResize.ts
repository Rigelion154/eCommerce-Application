import React, { useEffect } from 'react';
import handleResize from '../utils/handleResize';

export default function useResize(setIsSmallScreen: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    handleResize(setIsSmallScreen);
    window.addEventListener('resize', () => handleResize(setIsSmallScreen));
    return () => {
      window.removeEventListener('resize', () => handleResize(setIsSmallScreen));
    };
  }, [setIsSmallScreen]);
}
