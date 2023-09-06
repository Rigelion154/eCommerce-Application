import axios from 'axios';
import { apiConstants } from '../../../constants/apiConstants';
// import getCartById from '../getCartById';
import getCarts from '../getCarts';
import createCartByToken from '../createCartByToken';

export default async function addProductToCart(
  productId: string,
  variantId: number,
  quantity?: number,
) {
  if (!localStorage.getItem('cartId')) {
    createCartByToken()
      .then((res) => {
        if (!localStorage.getItem('cartId')) localStorage.setItem('cartId', res);
      })
      .catch(() => {});
  }

  const [cart] = await getCarts();
  // const { version, id: cartId } = await getCartById();
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

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
  // console.log(response.data);
}
