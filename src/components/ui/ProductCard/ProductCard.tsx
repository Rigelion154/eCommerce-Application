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
      <img className={styles.product__image} src={product.masterVariant.images[0].url} alt='img' />
      <h4>{product.name['en-US']}</h4>
      <div>
        <span>Price: </span>
        <span>
          {(product.masterVariant.prices[0].value.centAmount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
