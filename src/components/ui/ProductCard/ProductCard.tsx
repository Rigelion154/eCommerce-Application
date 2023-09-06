import React from 'react';
import { Link } from 'react-router-dom';
import { MasterData } from '../../../types/product-types';
import styles from './ProductCard.module.css';
import PriceBar from '../PriceBar/PriceBar';
import ToCartButton from '../toCartButton/ToCartButton';

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
    <div className={styles.product} key={product.id}>
      <Link
        to={`/categories/${current}/${brand}/${product.key}`}
        className={styles.header__wrapper}
      >
        <h4>{product.name['en-US']}</h4>
        <img
          key={product.id}
          className={styles.product__image}
          src={product.masterVariant.images[0].url}
          alt='omg'
        />
      </Link>
      <div className={styles.description__wrapper}>
        <div className={styles.price__wrapper}>
          <PriceBar price={price} discountPrice={discountPrice} />
          <ToCartButton productId={product.id} variantId={product.masterVariant.id} />
        </div>
        <Link
          to={`/categories/${current}/${brand}/${product.key}`}
          className={styles.information__link}
        >
          More information{' '}
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
