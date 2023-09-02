import React from 'react';

export default function handleSortValue(
  sortValue: string,
  setSort: React.Dispatch<React.SetStateAction<string>>,
) {
  if (sortValue === 'ASC') {
    setSort('DESC');
  } else {
    setSort('ASC');
  }
}
