import React from 'react';
import addProductToCart from '../../services/Cart/handleProduct/addProductToCart';
import getCartById from '../../services/Cart/getCartById';

export default function addToCartHandler(
  productId: string,
  variantId: number,
  setProductInCart: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentLineItemId: React.Dispatch<React.SetStateAction<string>>,
) {
  addProductToCart(productId, variantId)
    .then(() => {
      setProductInCart(true);
      getCartById()
        .then((res) => {
          const [lineItem] = res.lineItems.filter((item) => item.productId === productId);
          setCurrentLineItemId(lineItem.id);
        })
        .catch(() => {});
    })
    .catch(() => {});
}
