import React from 'react';
import { IProduct } from '../../types/product-types';
import getProductByBrand from './getProduct/getProductByBrand';

export default function handleCurrentProductsByBrand(
  brand: string | undefined,
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
) {
  getProductByBrand(brand)
    .then((res) => setProducts(res))
    .catch(() => {});
}
