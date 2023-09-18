import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { IMasterDataResponse, MasterData } from '../../../types/product-types';
import { ICategory } from '../../../types/category-types';

async function getProductsBySubCategory(subcategoryId: string, page: number) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search`;
  const token = localStorage.getItem('accessToken');
  const limit = 2;
  const offset = (page - 1) * limit;

  const response: AxiosResponse<IMasterDataResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter: `categories.id:"${subcategoryId}"`,
      limit,
      offset,
    },
  });
  const { results } = response.data;

  return results;
}

export default function handleProductsBySubCategory(
  currentSubCategory: ICategory[],
  page: number,
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
) {
  if (currentSubCategory.length > 0) {
    getProductsBySubCategory(currentSubCategory[0].id, page)
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
  }
}
