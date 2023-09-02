import axios, { AxiosResponse } from 'axios';
import { apiConstants } from './apiConstants';
import { IMasterDataResponse } from '../../types/product-types';

export default async function searchProductsByWord(words: string) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search?text.en-us=name:"${words}"`;
  const token = localStorage.getItem('accessToken');
  // const filter = [];
  // // {projectKey}/product-projections/suggest?searchKeywords.en=multi
  // filter.push(`searchKeywords.en-us.text:"${words}"`);
  // filter.push(`text.en-us=name:"${words}"`);
  // if (subcategoryId) {
  //   filter.push(`categories.id:"${subcategoryId}"`);
  // }
  const response: AxiosResponse<IMasterDataResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: {
    //   filter,
    // },
    // params: {
    //   filter,
    // },
  });

  const { results } = response.data;
  return results;
}
