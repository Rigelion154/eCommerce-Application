import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import PriceBar from '../PriceBar/PriceBar';
import { LineItemType } from '../../../types/cart-types/cart-types';
import styles from './CartProductCard.module.css';
import removeProductFromCard from '../../../core/services/Cart/handleProduct/removeProductFromCard';
import addProductToCart from '../../../core/services/Cart/handleProduct/addProductToCart';

function CartProductCard({ lineItem }: { lineItem: LineItemType }) {
  const [currentQuantity, setCurrentQuantity] = useState(lineItem.quantity);
  const [price, setPrice] = useState(lineItem.price.value.centAmount / 100);
  const [discount, setDiscount] = useState(
    lineItem.price.discounted && lineItem.price.discounted.value.centAmount / 100,
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setPrice(lineItem.price.value.centAmount / 100);
    setDiscount(lineItem.price.discounted && lineItem.price.discounted.value.centAmount / 100);
  }, [lineItem.price]);

  useEffect(() => {
    setTotalPrice(discount ? discount * currentQuantity : price * currentQuantity);
  }, [currentQuantity, discount, price]);

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
                  .then(() => {})
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
                  className={styles.button__quantity}
                  type='button'
                  onClick={() => {
                    removeProductFromCard(lineItem.id, 1)
                      .then(() => {})
                      .catch(() => {});
                    setCurrentQuantity(currentQuantity - 1);
                    setTotalPrice(price * (currentQuantity - 1));
                  }}
                >
                  -
                </button>
                <span className={styles.total_quantity}>{currentQuantity}</span>
                <button
                  className={styles.button__quantity}
                  type='button'
                  onClick={() => {
                    addProductToCart(lineItem.productId, lineItem.variant.id, 1)
                      .then(() => {})
                      .catch(() => {});
                    setCurrentQuantity(currentQuantity + 1);
                    setTotalPrice(price * (currentQuantity + 1));
                  }}
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
