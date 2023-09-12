import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { IMasterDataResponse, MasterData } from '../../../types/product-types';
import { IFormatCategory } from '../../../types/category-types';

async function getProductsByCategory(categoryId: string) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search`;
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<IMasterDataResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter: `categories.id: subtree ("${categoryId}")`,
    },
  });
  // console.log(response);
  const { results } = response.data;
  return results;
}

export default function handleProductsByCategory(
  currentCubCategory: IFormatCategory[],
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
) {
  if (currentCubCategory.length > 0) {
    getProductsByCategory(currentCubCategory[0].id)
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
  }
}
