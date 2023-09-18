import React from 'react';

export default function scrollHandler(
  e: Event,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const target = e.target as Document;
  const pageHeight = target.documentElement.scrollHeight;
  const pageTop = target.documentElement.scrollTop;
  const { innerHeight } = window;
  if (pageHeight - (pageTop + innerHeight) < 100) {
    setFetching(true);
  }
}
