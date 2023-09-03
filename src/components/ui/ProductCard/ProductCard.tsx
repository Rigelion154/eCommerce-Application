import React from 'react';
import { Link } from 'react-router-dom';
import { MasterData } from '../../../types/product-types';
import styles from './ProductCard.module.css';
import PriceBar from '../PriceBar/PriceBar';

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
      <PriceBar price={price} discountPrice={discountPrice} />
    </Link>
  );
}

export default ProductCard;
