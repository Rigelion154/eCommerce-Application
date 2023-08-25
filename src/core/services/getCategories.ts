import axios, { AxiosResponse } from 'axios';
import { apiConstants } from './apiConstants';
import { ICategoriesResponse } from '../../types/category-types';

export default async function getCategories() {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/categories`;
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<ICategoriesResponse> = await axios(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { results } = response.data;

  return results;
}