import axios from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { CartType } from '../../../types/cart-types/cart-types';

export default async function createCartByToken() {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts`;
  const token = localStorage.getItem('accessToken');
  const data = {
    currency: 'USD',
    country: 'US',
  };

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const cart = response.data as CartType;

  const { id: cartId } = cart;

  return cartId;
}
