import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import handleSortValue from '../../../../core/utils/sortFunctions/handleSortValue';
import handleSort from '../../../../core/utils/sortFunctions/handleSort';
import { ICategory } from '../../../../types/category-types';
import { MasterData } from '../../../../types/product-types';

import styles from './SortButton.module.css';

interface ISortButton {
  title: string;
  currentSubCategory: ICategory[];
  selectedColor: string;
  minValue: string;
  maxValue: string;
  selectedSize: string;
  sortType: string;
  sortValue: string;
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  isActive: boolean;
  setActiveButton: React.Dispatch<React.SetStateAction<string>>;
}

function SortButton({
  title,
  currentSubCategory,
  selectedColor,
  minValue,
  maxValue,
  selectedSize,
  sortType,
  sortValue,
  setProducts,
  setSortValue,
  isActive,
  setActiveButton,
}: ISortButton) {
  let icon = null;

  if (isActive) {
    if (sortValue === 'ASC') {
      icon = <GoArrowUp size={15} />;
    } else {
      icon = <GoArrowDown size={15} />;
    }
  }

  return (
    <button
      className={styles.button}
      type='button'
      onClick={() => {
        handleSortValue(sortValue, setSortValue);
        handleSort(
          currentSubCategory,
          selectedColor,
          minValue,
          maxValue,
          selectedSize,
          sortType,
          sortValue,
          setProducts,
        );
        setActiveButton(title);
      }}
    >
      <span className={styles.title}>{title}</span>
      <span>{icon}</span>
    </button>
  );
}

export default SortButton;
