import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroll-component';
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
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setProducts([]);
    // setLineItems([]);
    setFetching(true);
    setPage(1);
    handleProductsByCategory(currentCategory, 1, setProducts);
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

  const fetchMoreProducts = () => {
    const nextPage = page + 1;
    handleProductsByCategory(currentCategory, nextPage, (newProducts) => {
      if (newProducts.length === 0) {
        setFetching(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...(newProducts as MasterData[])]);
        setPage(nextPage);
      }
    });
  };

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
                <InfiniteScroll
                  dataLength={products.length}
                  next={fetchMoreProducts}
                  hasMore={fetching}
                  loader={<LoaderBar />}
                >
                  {products.map((product) => (
                    <Suspense key={product.id} fallback={<LoaderBar />}>
                      <LazyProductCard
                        lineItems={lineItems}
                        current={current}
                        brand={product.key.split('_')[0]}
                        product={product}
                        // key={product.id}
                      />
                    </Suspense>
                  ))}
                </InfiniteScroll>
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
