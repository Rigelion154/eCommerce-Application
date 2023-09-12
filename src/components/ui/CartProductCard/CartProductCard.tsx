import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

import { CartType, LineItemType } from '../../../types/cart-types/cart-types';

import addProductToCart from '../../../core/services/Cart/handleProduct/addProductToCart';
import removeProductFromCard from '../../../core/services/Cart/handleProduct/removeProductFromCard';

import PriceBar from '../PriceBar/PriceBar';

import styles from './CartProductCard.module.css';

function CartProductCard({
  lineItem,
  getTotalPrice,
}: {
  lineItem: LineItemType;
  getTotalPrice: (total: CartType) => void;
}) {
  const [currentQuantity, setCurrentQuantity] = useState(lineItem.quantity);
  const [price, setPrice] = useState(lineItem.price.value.centAmount / 100);
  const [discount, setDiscount] = useState<number | undefined>(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setPrice(lineItem.price.value.centAmount / 100);
    setDiscount(lineItem.price.discounted && lineItem.price.discounted.value.centAmount / 100);
  }, [lineItem.price]);

  useEffect(() => {
    setTotalPrice(discount ? discount * currentQuantity : price * currentQuantity);
  }, [currentQuantity, discount, price]);

  const handleAddToCart = async () => {
    setIsButtonDisabled(true);
    const addedCart = await addProductToCart(lineItem.productId, lineItem.variant.id, 1);
    getTotalPrice(addedCart);
    setCurrentQuantity(currentQuantity + 1);
    setTotalPrice(price * (currentQuantity + 1));
    setIsButtonDisabled(false);
  };

  const handleRemoveFromCart = async () => {
    setIsButtonDisabled(true);
    const removedCart = await removeProductFromCard(lineItem.id, 1);
    getTotalPrice(removedCart);
    setCurrentQuantity(currentQuantity - 1);
    setTotalPrice(price * (currentQuantity - 1));
    setIsButtonDisabled(false);
  };

  return (
    <div className={styles.container}>
      {currentQuantity > 0 && (
        <div key={lineItem.id} className={styles.item__wrapper}>
          <div className={styles.title__wrapper}>
            <h3 className={styles.cart__title}>{lineItem.variant.sku}</h3>
            <button
              className={styles.button__delete}
              type='button'
              onClick={() => {
                removeProductFromCard(lineItem.id, currentQuantity)
                  .then((res) => {
                    getTotalPrice(res);
                  })
                  .catch(() => {});
                setCurrentQuantity(0);
              }}
            >
              <IoIosCloseCircle size={20} color='#ff0000' />
            </button>
          </div>
          <div className={styles.description__wrapper}>
            <div className={styles.image__wrapper}>
              <img
                className={styles.cart__image}
                src={lineItem.variant.images[0].url}
                key={lineItem.id}
                alt={lineItem.variant.sku}
              />
              <PriceBar
                price={lineItem.variant.prices[0].value.centAmount}
                discountPrice={lineItem.variant.prices[0].discounted?.value.centAmount}
              />
            </div>
            <div className={styles.total__bar}>
              <div className={styles.total__wrapper}>
                <button
                  disabled={isButtonDisabled}
                  className={styles.button__quantity}
                  type='button'
                  onClick={handleRemoveFromCart}
                >
                  -
                </button>
                <span className={styles.total_quantity}>{currentQuantity}</span>
                <button
                  disabled={isButtonDisabled}
                  className={styles.button__quantity}
                  type='button'
                  onClick={handleAddToCart}
                >
                  +
                </button>
              </div>
              <div>
                <span className={styles.total__price}>
                  {totalPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartProductCard;
