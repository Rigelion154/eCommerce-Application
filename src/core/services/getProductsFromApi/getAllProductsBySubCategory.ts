import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { IMasterDataResponse, MasterData } from '../../../types/product-types';
import { ICategory } from '../../../types/category-types';

async function getAllProductsBySubCategory(subcategoryId: string) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search`;
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

export default function handleAllProductsBySubCategory(
  currentSubCategory: ICategory[],
  setProducts: React.Dispatch<React.SetStateAction<MasterData[]>>,
) {
  if (currentSubCategory.length > 0) {
    getAllProductsBySubCategory(currentSubCategory[0].id)
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
  }
}
