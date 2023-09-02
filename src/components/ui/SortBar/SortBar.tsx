import React, { useState } from 'react';
import SortButton from './SortButton/SortButton';
import { ICategory } from '../../../types/category-types';
import { MasterData } from '../../../types/product-types';
import styles from './SortBar.module.css';

interface ISortBar {
  nameTitle: string;
  priceTitle: string;
  currentSubCategory: ICategory[];
  selectedColor: string;
  minValue: string;
  maxValue: string;
  selectedSize: string;
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>;
}

function SortBar({
  nameTitle,
  priceTitle,
  currentSubCategory,
  selectedColor,
  minValue,
  maxValue,
  selectedSize,
  setProducts,
}: ISortBar) {
  const [nameSortValue, setNameSortValue] = useState('ASC');
  const [priceSortValue, setPriceSortValue] = useState('ASC');
  const [activeButton, setActiveButton] = useState('');

  return (
    <div className={styles.wrapper}>
      <SortButton
        title={nameTitle}
        currentSubCategory={currentSubCategory}
        selectedColor={selectedColor}
        minValue={minValue}
        maxValue={maxValue}
        selectedSize={selectedSize}
        sortType='name.en-us'
        sortValue={nameSortValue}
        setProducts={setProducts}
        setSortValue={setNameSortValue}
        isActive={activeButton === nameTitle}
        setActiveButton={setActiveButton}
      />
      <SortButton
        title={priceTitle}
        currentSubCategory={currentSubCategory}
        selectedColor={selectedColor}
        minValue={minValue}
        maxValue={maxValue}
        selectedSize={selectedSize}
        sortType='price'
        sortValue={priceSortValue}
        setProducts={setProducts}
        setSortValue={setPriceSortValue}
        isActive={activeButton === priceTitle}
        setActiveButton={setActiveButton}
      />
    </div>
  );
}

export default SortBar;
