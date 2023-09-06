import React, { useEffect, useState } from 'react';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import addProductToCart from '../../../core/services/Cart/handleProduct/addProductToCart';
import styles from './ToCartButton.module.css';
import removeProductFromCard from '../../../core/services/Cart/handleProduct/removeProductFromCard';
import isProductInCart from '../../../core/utils/Cart/isProductInCart';

function ToCartButton({ productId, variantId }: { productId: string; variantId: number }) {
  const [productInCart, setProductInCart] = useState<boolean>(false);
  const [currentLineItemId, setCurrentLineItemId] = useState<string>('');

  useEffect(() => {
    isProductInCart(productId)
      .then(({ isInCart, lineItem }) => {
        setProductInCart(isInCart);
        if (lineItem) setCurrentLineItemId(lineItem.id);
      })
      .catch(() => {});
  }, [productId]);

  const handleAddToCart = () => {
    if (productInCart) {
      removeProductFromCard(currentLineItemId)
        .then(() => setCurrentLineItemId(''))
        .catch(() => {});
    } else {
      addProductToCart(productId, variantId)
        .then(() => {
          isProductInCart(productId)
            .then(({ isInCart, lineItem }) => {
              setProductInCart(isInCart);
              if (lineItem) setCurrentLineItemId(lineItem.id);
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (currentLineItemId !== '') {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
  }, [currentLineItemId]);

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
