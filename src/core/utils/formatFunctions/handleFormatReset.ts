import React from 'react';
import handleProductsBySubCategory from '../../services/getProductsFromApi/getProductsBySubCategory';
import { MasterData } from '../../../types/product-types';
import { ICategory } from '../../../types/category-types';

export default function handleFormatReset(
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>,
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>,
  setMinValue: React.Dispatch<React.SetStateAction<string>>,
  setMaxValue: React.Dispatch<React.SetStateAction<string>>,
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
  currentCubCategory: ICategory[],
) {
  setSelectedColor('');
  setSelectedSize('');
  setMinValue('0');
  setMaxValue('5000');
  handleProductsBySubCategory(currentCubCategory, setProducts);
}