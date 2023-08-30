import React from 'react';
import formatProductsFromSubcategory from '../../services/formatProductsFromSubcategory';
import { MasterData } from '../../../types/product-types';
import { ICategory } from '../../../types/category-types';

export default function handleFormat(
  e: React.FormEvent<HTMLFormElement>,
  currentCubCategory: ICategory[],
  selectedColor: string,
  selectedSize: string,
  minValue: string,
  maxValue: string,
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
) {
  e.preventDefault();
  const minPrice = (+minValue * 100).toString();
  const maxPrice = (+maxValue * 100).toString();

  formatProductsFromSubcategory(
    currentCubCategory[0].id,
    selectedColor,
    minPrice,
    maxPrice,
    selectedSize,
  )
    .then((res) => setProducts(res))
    .catch(() => {});
}
