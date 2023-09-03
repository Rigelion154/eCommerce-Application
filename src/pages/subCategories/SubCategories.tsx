import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MasterData } from '../../types/product-types';
import Container from '../../components/layout/container/Container';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import useCategory from '../../core/hooks/useCategory';
import useSubCategory from '../../core/hooks/useSubCategory';
import handleProductsBySubCategory from '../../core/services/getProductsFromApi/getProductsBySubCategory';
import ProductCard from '../../components/ui/ProductCard/ProductCard';
import FilterColorInput from '../../components/ui/FilterInput/FilterColorInput';
import FilterSizeInput from '../../components/ui/FilterInput/FilterSizeInput';
import FilerPriceInput from '../../components/ui/FilterInput/FilerPriceInput';
import handleFormat from '../../core/utils/formatFunctions/handleFormat';
import handleFormatReset from '../../core/utils/formatFunctions/handleFormatReset';
import SortBar from '../../components/ui/SortBar/SortBar';
import styles from './SubCategories.module.css';
import handleResize from '../../core/utils/handleResize';

function SubCategories() {
  const { current, brand } = useParams();
  const currentCategory = useCategory(current);
  const currentSubCategory = useSubCategory(brand);
  const [burger, setBurger] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [products, setProducts] = useState<MasterData[]>([]);
  const [currentProducts, setCurrentProducts] = useState<MasterData[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('5000');
  const [selectedSize, setSelectedSize] = useState('');
  const minPrice = (+minValue * 100).toString();
  const maxPrice = (+maxValue * 100).toString();
  const screenSizes: string[] = [];
  const colors: string[] = [];
  currentProducts.forEach((prod) => {
    prod.masterVariant.attributes
      .filter((atr) => atr.name === 'screen_size')
      .forEach((atr) => {
        if (!screenSizes.includes(atr.value.toString())) screenSizes.push(atr.value.toString());
      });
  });

  currentProducts.forEach((prod) => {
    prod.masterVariant.attributes
      .filter((atr) => atr.name === 'product_color')
      .forEach((atr) => {
        if (!colors.includes(atr.value.toString())) colors.push(atr.value.toString());
      });
  });

  useEffect(() => {
    handleProductsBySubCategory(currentSubCategory, setProducts);
    handleProductsBySubCategory(currentSubCategory, setCurrentProducts);
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
                  Apply
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
                    );
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className={styles.products}>
            {isSmallScreen && (
              <button className={styles.button} type='button' onClick={() => setBurger(!burger)}>
                Filters
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
              <ProductCard current={current} brand={brand} product={product} key={product.id} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SubCategories;
