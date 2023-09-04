import React from 'react';
import formatProductsFromSubcategory from '../../services/formatProductsFromSubcategory';
import { ICategory } from '../../../types/category-types';
import { MasterData } from '../../../types/product-types';

export default function handleSort(
  currentSubCategory: ICategory[],
  selectedColor: string,
  minValue: string,
  maxValue: string,
  selectedSize: string,
  sortType: string,
  sortValue: string,
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
) {
  formatProductsFromSubcategory(
    currentSubCategory[0].id,
    selectedColor,
    minValue,
    maxValue,
    selectedSize,
    sortType,
    sortValue,
  )
    .then((res) => {
      setProducts(res);
    })
    .catch(() => {});
}
