import React from 'react';
import styles from './PriceBar.module.css';

function PriceBar({ price, discountPrice }: { price: number; discountPrice: number | undefined }) {
  return (
    <div>
      <div>
        <span>Price: </span>
        <span className={discountPrice ? styles.discount_price : ''}>
          {(price / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
      {discountPrice && (
        <div className={styles.discount__wrapper}>
          <span>Discount 10%: </span>
          <span>
            {((price / 100) * 0.9).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>
      )}
    </div>
  );
}

export default PriceBar;
