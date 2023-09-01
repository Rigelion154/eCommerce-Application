import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../types/product-types';
import getProductByKey from '../../core/utils/getProductByKey';
import Slider from '../../components/ui/slider/slider';

import styles from './ProductPage.module.css';

function ProductPage() {
  const { key } = useParams();
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    getProductByKey(key)
      .then((res) => {
        setProduct(res);
        console.log(res[0].masterData.current.masterVariant.prices[0].value.centAmount);
      })
      .catch(() => {});
  }, [key]);
  return (
    <div className={styles.product__page}>
      {product.map((elem) => (
        <div className={styles.product__container}>
          <Slider images={elem.masterData.current.masterVariant.images} />
          <div className={styles.product__info}>
            <h2 className={styles.product__title}>{elem.masterData.current.name['en-US']}</h2>
            <p className={styles.product__price}>
              {elem.masterData.current.masterVariant.prices[0].value.centAmount}{' '}
              {elem.masterData.current.masterVariant.prices[0].value.currencyCode}
            </p>
            <p className={styles.product__desc}>{elem.masterData.current.description['en-US']}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;