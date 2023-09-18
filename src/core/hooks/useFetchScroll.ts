import React, { useEffect } from 'react';
import { ICategory, IFormatCategory } from '../../types/category-types';
import { MasterData } from '../../types/product-types';

export default function useFetchScroll(
  category: ICategory[] | IFormatCategory[],
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  fetching: boolean,
  setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  products: MasterData[],
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
  fetchFunction: (subcategoryId: string, page: number) => Promise<MasterData[]>,
) {
  useEffect(() => {
    if (fetching) {
      if (category.length > 0) {
        fetchFunction(category[0].id, currentPage)
          .then((res) => {
            setProducts([...products, ...res]);
            setCurrentPage((prevState) => prevState + 3);
          })
          .catch(() => {})
          .finally(() => setFetching(false));
      }
    }
  }, [
    fetching,
    setFetching,
    currentPage,
    setCurrentPage,
    category,
    products,
    setProducts,
    fetchFunction,
  ]);
}
