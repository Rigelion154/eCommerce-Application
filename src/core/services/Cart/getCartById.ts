import axios from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { CartType } from '../../../types/cart-types/cart-types';

export default async function getCartById() {
  const cartId = localStorage.getItem('cartId');
  const token = localStorage.getItem('accessToken');
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts/${cartId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data as CartType;
}
