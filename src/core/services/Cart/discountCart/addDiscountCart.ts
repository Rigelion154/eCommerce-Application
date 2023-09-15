import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../../constants/apiConstants';
import { CartType } from '../../../../types/cart-types/cart-types';
import getCartById from '../getCartById';

export default async function addDiscountCart(promo: string) {
  const cart = await getCartById();
  const { version, id: cartId } = cart;
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts/${cartId}`;
  const token = localStorage.getItem('accessToken');
  const data = {
    version,
    actions: [
      {
        action: 'addDiscountCode',
        code: promo,
      },
    ],
  };

  const response: AxiosResponse<CartType> = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // console.log('добавляем discount', response.data);
  return response.data;
}
