import axios, { AxiosResponse } from 'axios';
import { apiConstants } from './apiConstants';
import { ICategoriesResponse } from '../../types/types';

export default async function getProducts() {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/products`;
  const token = localStorage.getItem('accessToken');

  const response: AxiosResponse<ICategoriesResponse> = await axios(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { results } = response.data;

  return results;
}
