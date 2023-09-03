import React from 'react';
import { Link } from 'react-router-dom';
import { MasterData } from '../../../types/product-types';
import styles from './ProductCard.module.css';

function ProductCard({
  current,
  brand,
  product,
}: {
  current: string | undefined;
  brand: string | undefined;
  product: MasterData;
}) {
  const price = product.masterVariant.prices[0].value.centAmount;
  const discountPrice = product.masterVariant.prices[0].discounted?.value.centAmount;

  // console.log(price, discountPrice);

  return (
    <Link
      to={`/categories/${current}/${brand}/${product.key}`}
      className={styles.product}
      key={product.id}
    >
      <div>
        <h4>{product.name['en-US']}</h4>
        <img
          className={styles.product__image}
          src={product.masterVariant.images[0].url}
          alt='img'
        />
      </div>
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
    </Link>
  );
}

export default ProductCard;
