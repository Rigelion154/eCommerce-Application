import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { IMasterDataResponse, MasterData } from '../../../types/product-types';
import { ICategory } from '../../../types/category-types';

async function getProductsBySubCategory(subcategoryId: string) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search?limit=3&sort=id+asc`;
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<IMasterDataResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter: `categories.id:"${subcategoryId}"`,
    },
  });
  const { results } = response.data;
  return results;
}

export default function handleProductsBySubCategory(
  currentCubCategory: ICategory[],
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
) {
  if (currentCubCategory.length > 0) {
    getProductsBySubCategory(currentCubCategory[0].id)
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
  }
}
