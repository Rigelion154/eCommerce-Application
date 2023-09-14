import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { CartType } from '../../../types/cart-types/cart-types';

export default async function createCartByToken() {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts`;
  const token = localStorage.getItem('accessToken');
  const data = {
    currency: 'USD',
    country: 'US',
  };

  const response: AxiosResponse<CartType> = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('создаём корзину', response.data);
  return response.data;
}
