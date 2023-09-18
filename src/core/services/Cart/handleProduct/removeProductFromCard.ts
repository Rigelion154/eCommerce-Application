import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../../constants/apiConstants';
import getCartById from '../getCartById';
import { CartType } from '../../../../types/cart-types/cart-types';

export default async function removeProductFromCard(lineItemId: string, quantity?: number) {
  const { version, id: cartId } = await getCartById();
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts/${cartId}`;
  const token = localStorage.getItem('accessToken');
  const data = {
    version,
    actions: [
      {
        action: 'removeLineItem',
        lineItemId,
        quantity,
      },
    ],
  };

  const response: AxiosResponse<CartType> = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('удаляем товар', response.data);
  return response.data;
}
