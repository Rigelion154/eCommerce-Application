import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MasterData } from '../../types/product-types';
import Container from '../../components/layout/container/Container';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import useCategory from '../../core/hooks/useCategory';
import useSubCategory from '../../core/hooks/useSubCategory';
import handleProductsBySubCategory from '../../core/services/getProductsFromApi/getProductsBySubCategory';
import handleAllProductsBySubCategory from '../../core/services/getProductsFromApi/getAllProductsBySubCategory';
// import ProductCard from '../../components/ui/ProductCard/ProductCard';
import FilterColorInput from '../../components/ui/FilterInput/FilterColorInput';
import FilterSizeInput from '../../components/ui/FilterInput/FilterSizeInput';
import FilerPriceInput from '../../components/ui/FilterInput/FilerPriceInput';
import handleFormat from '../../core/utils/formatFunctions/handleFormat';
import handleFormatReset from '../../core/utils/formatFunctions/handleFormatReset';
import SortBar from '../../components/ui/SortBar/SortBar';
import styles from './SubCategories.module.css';
import handleResize from '../../core/utils/handleResize';
import LoaderBar from '../../components/ui/LoaderBar/LoaderBar';
import { LineItemType } from '../../types/cart-types/cart-types';
import getCartById from '../../core/services/Cart/getCartById';

const LazyProductCard = lazy(() => import('../../components/ui/ProductCard/ProductCard'));

function SubCategories() {
  const { current, brand } = useParams();
  const { currentCategory, status } = useCategory(current);
  const { currentSubCategory } = useSubCategory(brand);
  const [burger, setBurger] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [products, setProducts] = useState<MasterData[]>([]);
  const [allCurrentProducts, setAllCurrentProducts] = useState<MasterData[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('5000');
  const [selectedSize, setSelectedSize] = useState('');
  const minPrice = (+minValue * 100).toString();
  const maxPrice = (+maxValue * 100).toString();
  const screenSizes: string[] = [];
  const colors: string[] = [];
  const [lineItems, setLineItems] = useState<LineItemType[]>([]);
  const [fetching, setFetching] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreProducts = () => {
    const nextPage = page + 1;
    handleProductsBySubCategory(currentSubCategory, nextPage, (newProducts) => {
      if (newProducts.length === 0) {
        setFetching(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...(newProducts as MasterData[])]);
        setPage(nextPage);
      }
    });
  };

  allCurrentProducts.forEach((prod) => {
    prod.masterVariant.attributes
      .filter((atr) => atr.name === 'screen_size')
      .forEach((atr) => {
        if (!screenSizes.includes(atr.value.toString())) screenSizes.push(atr.value.toString());
      });
  });

  allCurrentProducts.forEach((prod) => {
    prod.masterVariant.attributes
      .filter((atr) => atr.name === 'product_color')
      .forEach((atr) => {
        if (!colors.includes(atr.value.toString())) colors.push(atr.value.toString());
      });
  });

  useEffect(() => {
    if (localStorage.getItem('cartId')) {
      getCartById()
        .then((res) => {
          setLineItems(res.lineItems);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    setProducts([]);
    // setLineItems([]);
    setFetching(true);
    setPage(1);
    handleProductsBySubCategory(currentSubCategory, 1, setProducts);
    handleAllProductsBySubCategory(currentSubCategory, setAllCurrentProducts);
    handleResize(setIsSmallScreen);
    window.addEventListener('resize', () => handleResize(setIsSmallScreen));
    return () => {
      window.removeEventListener('resize', () => handleResize(setIsSmallScreen));
    };
  }, [currentSubCategory]);

  useEffect(() => {
    if (burger) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [burger]);

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
                          setFetching,
                          setPage,
                          currentSubCategory,
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
                          brand={brand}
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
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default SubCategories;
