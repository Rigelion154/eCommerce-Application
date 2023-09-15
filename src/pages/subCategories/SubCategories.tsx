import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MasterData } from '../../types/product-types';
import { LineItemType } from '../../types/cart-types/cart-types';

import useCategory from '../../core/hooks/useCategory';
import useSubCategory from '../../core/hooks/useSubCategory';
import handleProductsBySubCategory from '../../core/services/getProductsFromApi/getProductsBySubCategory';
import handleFormat from '../../core/utils/formatFunctions/handleFormat';
import handleFormatReset from '../../core/utils/formatFunctions/handleFormatReset';
import useScrollEvent from '../../core/hooks/useScrollEvent';
import useSetLineItems from '../../core/hooks/useSetLineItems';
import useResize from '../../core/hooks/useResize';

import Container from '../../components/layout/container/Container';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import FilterColorInput from '../../components/ui/FilterInput/FilterColorInput';
import FilterSizeInput from '../../components/ui/FilterInput/FilterSizeInput';
import FilerPriceInput from '../../components/ui/FilterInput/FilerPriceInput';
import SortBar from '../../components/ui/SortBar/SortBar';
import LoaderBar from '../../components/ui/LoaderBar/LoaderBar';

import styles from './SubCategories.module.css';
import useFetchScroll from '../../core/hooks/useFetchScroll';
import useBurger from '../../core/hooks/useBurger';
import infinitySubCategories from '../../core/services/infinityScroll/infinitySubCategories';
import getFormatColor from '../../core/utils/formatFunctions/getFormatColor';
import getFormatScreenSize from '../../core/utils/formatFunctions/getFormatScreenSize';

const LazyProductCard = lazy(() => import('../../components/ui/ProductCard/ProductCard'));

function SubCategories() {
  const { current, brand } = useParams();
  const { currentCategory, status } = useCategory(current);
  const { currentSubCategory } = useSubCategory(brand);

  const [burger, setBurger] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [products, setProducts] = useState<MasterData[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('5000');
  const [selectedSize, setSelectedSize] = useState('');
  const [lineItems, setLineItems] = useState<LineItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(3);
  const [fetching, setFetching] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [screenSizes, setScreenSizes] = useState<string[]>([]);

  const minPrice = (+minValue * 100).toString();
  const maxPrice = (+maxValue * 100).toString();
  // const screenSizes = getFormatScreenSize(currentProducts);

  useEffect(() => {
    handleProductsBySubCategory(currentSubCategory, setProducts);
  }, [currentSubCategory]);

  useEffect(() => {
    setColors(getFormatColor(products));
    setScreenSizes(getFormatScreenSize(products));
  }, [products]);

  useScrollEvent(setFetching);
  useSetLineItems(setLineItems);
  useResize(setIsSmallScreen);
  useBurger(burger);
  useFetchScroll(
    currentSubCategory,
    currentPage,
    setCurrentPage,
    fetching,
    setFetching,
    products,
    setProducts,
    infinitySubCategories,
  );

  useEffect(() => {
    setProducts([]);
    setFetching(false);
    setCurrentPage(3);
  }, [brand]);

  return (
    <div>
      {status || products.length === 0 ? (
        <LoaderBar />
      ) : (
        <div>
          <SubCategoryBar currentCategory={currentCategory} />
          <Container>
            <div className={styles.wrapper}>
              <div className={burger ? [styles.aside, styles.open_burger].join(' ') : styles.aside}>
                <form
                  className={styles.form}
                  onSubmit={(e) => {
                    setBurger(false);
                    handleFormat(
                      e,
                      currentSubCategory,
                      selectedColor,
                      selectedSize,
                      minPrice,
                      maxPrice,
                      setProducts,
                    );
                  }}
                >
                  <FilterColorInput
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    value={colors}
                  />
                  <FilterSizeInput
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    value={screenSizes}
                  />
                  <FilerPriceInput
                    minValue={minValue}
                    maxValue={maxValue}
                    setMinValue={setMinValue}
                    setMaxValue={setMaxValue}
                  />
                  <div className={styles.buttons}>
                    <button className={styles.button} type='submit'>
                      <span>Apply</span>
                    </button>
                    <button
                      className={styles.button}
                      type='button'
                      onClick={() => {
                        setBurger(false);
                        handleFormatReset(
                          setSelectedColor,
                          setSelectedSize,
                          setMinValue,
                          setMaxValue,
                          setProducts,
                          currentSubCategory,
                          setCurrentPage,
                        );
                      }}
                    >
                      <span>Reset</span>
                    </button>
                  </div>
                </form>
              </div>
              <div className={styles.products}>
                {isSmallScreen && (
                  <button
                    className={styles.button}
                    type='button'
                    onClick={() => setBurger(!burger)}
                  >
                    <span>Filters</span>
                  </button>
                )}
                <SortBar
                  nameTitle='Sort by name'
                  priceTitle='Sort by price'
                  currentSubCategory={currentSubCategory}
                  selectedColor={selectedColor}
                  minValue={minPrice}
                  maxValue={maxPrice}
                  selectedSize={selectedSize}
                  setProducts={setProducts}
                />
                {products.map((product) => (
                  <Suspense key={product.id} fallback={<LoaderBar />}>
                    <LazyProductCard
                      lineItems={lineItems}
                      current={current}
                      brand={brand}
                      product={product}
                      key={product.id}
                    />
                  </Suspense>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default SubCategories;
