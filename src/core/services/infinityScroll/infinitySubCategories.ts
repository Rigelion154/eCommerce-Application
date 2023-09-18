import axios, { AxiosResponse } from 'axios';
import { IMasterDataResponse } from '../../../types/product-types';
import { apiConstants } from '../../constants/apiConstants';

export default async function infinitySubCategories(subcategoryId: string, page: number) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search?limit=3&sort=id+asc&withTotal=false&offset=${page}`;
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
