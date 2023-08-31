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
        console.log(res[0].masterData.current.masterVariant.images);
      })
      .catch(() => {});
  }, [key]);
  return (
    <div className={styles.product__page}>
      {product.map((elem) => (
        <div className={styles.product__container}>
          <div className={styles.product__img_block}>
            <img src={elem.masterData.current.masterVariant.images[0].url} alt='img' />
          </div>
          <Slider images={elem.masterData.current.masterVariant.images} />
          <h2 className={styles.product__title}>{elem.masterData.current.name['en-US']}</h2>
          <p className={styles.product__desc}>{elem.masterData.current.description['en-US']}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
