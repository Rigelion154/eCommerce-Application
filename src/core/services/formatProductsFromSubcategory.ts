import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../constants/apiConstants';
import { IMasterDataResponse } from '../../types/product-types';

export default async function formatProductsFromSubcategory(
  subcategoryId: string,
  color?: string | null,
  minPrice?: string | null,
  maxPrice?: string | null,
  screenSize?: string | null,
  sortType?: string,
  sortValue?: string,
) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/product-projections/search`;
  const token = localStorage.getItem('accessToken');
  const filter = [];
  const sort = [];

  if (sortType && sortValue) {
    sort.push(`${sortType} ${sortValue}`);
  }

  filter.push(
    `variants.price.centAmount:range(${minPrice || '0'} to ${
      maxPrice && +maxPrice === 0 ? '10000000' : maxPrice
    })`,
  );

  if (subcategoryId) {
    filter.push(`categories.id:"${subcategoryId}"`);
  }

  if (color) {
    filter.push(`variants.attributes.product_color:"${color}"`);
  }

  if (screenSize) {
    filter.push(`variants.attributes.screen_size:"${screenSize}"`);
  }

  const response: AxiosResponse<IMasterDataResponse> = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      filter,
      sort,
    },
  });
  const { results } = response.data;
  return results;
}
