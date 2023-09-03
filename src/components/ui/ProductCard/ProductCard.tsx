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
          <span>
            {(product.masterVariant.prices[0].value.centAmount / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </span>
        </div>
        <div className={styles.discount__wrapper}>
          <span>Discount 10%: </span>
          <span>
            {((product.masterVariant.prices[0].value.centAmount / 100) * 0.9).toLocaleString(
              'en-US',
              {
                style: 'currency',
                currency: 'USD',
              },
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
