import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../types/product-types';
import getProductByKey from '../../core/utils/getProduct/getProductByKey';
import Slider from '../../components/ui/slider/slider';
import styles from './ProductPage.module.css';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import useCategory from '../../core/hooks/useCategory';
import PriceBar from '../../components/ui/PriceBar/PriceBar';
import LoaderBar from '../../components/ui/LoaderBar/LoaderBar';
import ToCartButton from '../../components/ui/toCartButton/ToCartButton';

function ProductPage() {
  const { current, key } = useParams();
  const [product, setProduct] = useState<IProduct[]>([]);
  const { currentCategory, status } = useCategory(current);

  useEffect(() => {
    getProductByKey(key)
      .then((res) => {
        setProduct(res);
      })
      .catch(() => {});
  }, [key]);
  // console.log(product);
  return (
    <div>
      {status || product.length === 0 ? (
        <LoaderBar />
      ) : (
        <div className={styles.product__page}>
          <SubCategoryBar currentCategory={currentCategory} />
          {product.map((elem) => (
            <div key={elem.id} className={styles.product__container}>
              <Slider images={elem.masterData.current.masterVariant.images} />
              <div className={styles.product__info}>
                <h2 className={styles.product__title}>{elem.masterData.current.name['en-US']}</h2>
                <PriceBar
                  price={product[0].masterData.current.masterVariant.prices[0].value.centAmount}
                  discountPrice={
                    product[0].masterData.current.masterVariant.prices[0].discounted?.value
                      .centAmount
                  }
                />
                <ToCartButton
                  productId={elem.id}
                  variantId={elem.masterData.current.masterVariant.id}
                />
                {elem.masterData.current.description && (
                  <p className={styles.product__desc}>
                    {elem.masterData.current.description['en-US']}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
