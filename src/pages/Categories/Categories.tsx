import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MasterData } from '../../types/product-types';
import { LineItemType } from '../../types/cart-types/cart-types';

import useCategory from '../../core/hooks/useCategory';
import getCartById from '../../core/services/Cart/getCartById';
import handleProductsByCategory from '../../core/services/getProductsFromApi/getProductsByCategory';

import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import Container from '../../components/layout/container/Container';
import LoaderBar from '../../components/ui/LoaderBar/LoaderBar';

import styles from './Categories.module.css';

const LazyProductCard = lazy(() => import('../../components/ui/ProductCard/ProductCard'));

function Categories() {
  const { current } = useParams();
  const { currentCategory, status } = useCategory(current);
  const [products, setProducts] = useState<MasterData[]>([]);
  const [lineItems, setLineItems] = useState<LineItemType[]>([]);

  useEffect(() => {
    handleProductsByCategory(currentCategory, setProducts);
  }, [currentCategory]);

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
      {status || products.length === 0 ? (
        <LoaderBar />
      ) : (
        <>
          <SubCategoryBar currentCategory={currentCategory} />
          <Container>
            <div className={styles.wrapper}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Suspense fallback={<LoaderBar />} key={product.id}>
                    <LazyProductCard
                      lineItems={lineItems}
                      current={current}
                      brand={product.key.split('_')[0]}
                      product={product}
                      key={product.id}
                    />
                  </Suspense>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default Categories;
