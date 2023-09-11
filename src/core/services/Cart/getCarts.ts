import axios from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { CartType } from '../../../types/cart-types/cart-types';

export default async function getCarts() {
  const token = localStorage.getItem('accessToken');
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/carts`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { results } = response.data as { results: CartType[] };

  // console.log(results);
  return results;
}
