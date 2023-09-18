import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { CartType } from '../../../types/cart-types/cart-types';
import getCartById from './getCartById';

async function sendPromoCode(promoCode: string) {
  const cart = await getCartById();
  const cartId = cart.id;
  const cartVersion = cart.version;
  const token = localStorage.getItem('accessToken');
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts/${cartId}`;

  const requestData = {
    version: cartVersion,
    actions: [
      {
        action: 'addDiscountCode',
        code: promoCode,
      },
    ],
  };

  const response: AxiosResponse<CartType> = await axios.post(url, requestData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
}

export default sendPromoCode;
