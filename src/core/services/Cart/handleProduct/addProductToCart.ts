import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../../constants/apiConstants';
import getCartById from '../getCartById';
import { CartType } from '../../../../types/cart-types/cart-types';

export default async function addProductToCart(
  productId: string,
  variantId: number,
  quantity?: number,
) {
  const cart = await getCartById();
  const { version, id: cartId } = cart;
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts/${cartId}`;
  const token = localStorage.getItem('accessToken');
  const data = {
    version,
    actions: [
      {
        action: 'addLineItem',
        productId,
        variantId,
        quantity,
      },
    ],
  };

  const response: AxiosResponse<CartType> = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // console.log('добавляем товар', response.data);
  return response.data;
}
