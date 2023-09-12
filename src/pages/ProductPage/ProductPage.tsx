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
import getCartById from '../../core/services/Cart/getCartById';
import { LineItemType } from '../../types/cart-types/cart-types';

function ProductPage() {
  const { current, key } = useParams();
  const [product, setProduct] = useState<IProduct[]>([]);
  const { currentCategory, status } = useCategory(current);
  const [lineItems, setLineItems] = useState<LineItemType[]>([]);

  useEffect(() => {
    getProductByKey(key)
      .then((res) => {
        setProduct(res);
      })
      .catch(() => {});
  }, [key]);

  useEffect(() => {
    if (localStorage.getItem('cartId')) {
      getCartById()
        .then((res) => {
          setLineItems(res.lineItems);
        })
        .catch(() => {});
    }
  }, []);

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
                  lineItems={lineItems}
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
