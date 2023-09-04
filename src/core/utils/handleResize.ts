import { Dispatch, SetStateAction } from 'react';

export default function handleResize(setScreen: Dispatch<SetStateAction<boolean>>) {
  if (window.innerWidth < 768) {
    setScreen(true);
  } else {
    setScreen(false);
  }
}
