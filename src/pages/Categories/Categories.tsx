import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MasterData } from '../../types/product-types';
import { LineItemType } from '../../types/cart-types/cart-types';

import useCategory from '../../core/hooks/useCategory';
import handleProductsByCategory from '../../core/services/getProductsFromApi/getProductsByCategory';

import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import Container from '../../components/layout/container/Container';
import LoaderBar from '../../components/ui/LoaderBar/LoaderBar';

import styles from './Categories.module.css';
import useScrollEvent from '../../core/hooks/useScrollEvent';
import useSetLineItems from '../../core/hooks/useSetLineItems';
import useFetchScroll from '../../core/hooks/useFetchScroll';
import infinityCategories from '../../core/services/infinityScroll/infinityCategories';

const LazyProductCard = lazy(() => import('../../components/ui/ProductCard/ProductCard'));

function Categories() {
  const { current } = useParams();
  const { currentCategory, status } = useCategory(current);
  const [products, setProducts] = useState<MasterData[]>([]);
  const [lineItems, setLineItems] = useState<LineItemType[]>([]);

  const [currentPage, setCurrentPage] = useState(3);
  const [fetching, setFetching] = useState(false);

  // useEffect(() => {
  //   setProducts([]);
  //   // setLineItems([]);
  //   setFetching(true);
  //   handleProductsByCategory(currentCategory, setProducts);
  // }, [currentCategory]);

  useEffect(() => {
    handleProductsByCategory(currentCategory, setProducts);
  }, [currentCategory]);

  useEffect(() => {
    setProducts([]);
    setFetching(false);
    setCurrentPage(3);
  }, [current]);

  useScrollEvent(setFetching);
  useSetLineItems(setLineItems);
  useFetchScroll(
    currentCategory,
    currentPage,
    setCurrentPage,
    fetching,
    setFetching,
    products,
    setProducts,
    infinityCategories,
  );

  return (
    <div>
      {status || products.length === 0 ? (
        <LoaderBar />
      ) : (
        <>
          <SubCategoryBar currentCategory={currentCategory} />
          <Container>
            <div className={styles.wrapper}>
              {products.map((product) => (
                <Suspense key={product.id} fallback={<LoaderBar />}>
                  <LazyProductCard
                    lineItems={lineItems}
                    current={current}
                    brand={product.key.split('_')[0]}
                    product={product}
                  />
                </Suspense>
              ))}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default Categories;
