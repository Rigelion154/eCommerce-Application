import React, { useEffect, useState } from 'react';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import styles from './ToCartButton.module.css';
import removeProductFromCard from '../../../core/services/Cart/handleProduct/removeProductFromCard';
import createCartByToken from '../../../core/services/Cart/createCartByToken';
import getCartById from '../../../core/services/Cart/getCartById';
import addToCartHandler from '../../../core/utils/Cart/addToCartHandler';

function ToCartButton({ productId, variantId }: { productId: string; variantId: number }) {
  const [productInCart, setProductInCart] = useState<boolean>(false);
  const [currentLineItemId, setCurrentLineItemId] = useState('');

  useEffect(() => {
    if (localStorage.getItem('cartId')) {
      getCartById()
        .then((res) => {
          const [lineItem] = res.lineItems.filter((item) => item.productId === productId);
          setCurrentLineItemId(lineItem.id);
          setProductInCart(true);
        })
        .catch(() => {
          setProductInCart(false);
        });
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (productInCart) {
      removeProductFromCard(currentLineItemId)
        .then(() => setProductInCart(false))
        .catch(() => {});
    } else {
      if (!localStorage.getItem('cartId')) {
        createCartByToken()
          .then((response) => {
            localStorage.setItem('cartId', response.id);
            addToCartHandler(productId, variantId, setProductInCart, setCurrentLineItemId);
          })
          .catch(() => {});
      }
      if (localStorage.getItem('cartId')) {
        addToCartHandler(productId, variantId, setProductInCart, setCurrentLineItemId);
      }
    }
  };

  return (
    <button className={styles.button} type='button' onClick={handleAddToCart}>
      {productInCart ? (
        <BsFillCartDashFill color='red' size={30} />
      ) : (
        <BsFillCartPlusFill color='green' size={30} />
      )}
    </button>
  );
}

export default ToCartButton;
