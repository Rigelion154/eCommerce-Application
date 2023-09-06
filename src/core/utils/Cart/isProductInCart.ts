// import getCartById from '../../services/Cart/getCartById';
import { LineItemType } from '../../../types/cart-types/cart-types';
import getCarts from '../../services/Cart/getCarts';

interface IsProductInCartResult {
  lineItem: LineItemType | undefined;
  isInCart: boolean;
}

export default async function isProductInCart(id: string): Promise<IsProductInCartResult> {
  // const cart = await getCartById();
  const [cart] = await getCarts();
  const [lineItem] = cart.lineItems.filter((item) => item.productId === id);
  const isInCart = Boolean(lineItem);
  return { lineItem, isInCart };
}
