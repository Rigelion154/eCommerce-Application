import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { IMasterDataResponse, MasterData } from '../../../types/product-types';
import { IFormatCategory } from '../../../types/category-types';

async function getProductsByCategory(categoryId: string) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search?limit=3&sort=id+asc`;
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<IMasterDataResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter: `categories.id: subtree ("${categoryId}")`,
    },
  });

  const { results } = response.data;
  return results;
}

export default function handleProductsByCategory(
  currentCubCategory: IFormatCategory[],
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
  // page: number,
  // setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  // setFetching: React.Dispatch<React.SetStateAction<boolean>>,
  // products: MasterData[],
) {
  if (currentCubCategory.length > 0) {
    getProductsByCategory(currentCubCategory[0].id)
      .then((res) => setProducts(res))
      .catch(() => {});
  }
}
