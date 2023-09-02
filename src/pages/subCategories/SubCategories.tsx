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

function SubCategories() {
  const { current, brand } = useParams();
  const currentCategory = useCategory(current);
  const currentSubCategory = useSubCategory(brand);
  const [products, setProducts] = useState<MasterData[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('5000');
  const [selectedSize, setSelectedSize] = useState('');
  const minPrice = (+minValue * 100).toString();
  const maxPrice = (+maxValue * 100).toString();

  useEffect(() => {
    handleProductsBySubCategory(currentSubCategory, setProducts);
  }, [currentSubCategory]);

  return (
    <div>
      <SubCategoryBar currentCategory={currentCategory} />
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.aside}>
            <form
              onSubmit={(e) =>
                handleFormat(
                  e,
                  currentSubCategory,
                  selectedColor,
                  selectedSize,
                  minPrice,
                  maxPrice,
                  setProducts,
                )
              }
            >
              <FilterColorInput selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
              <FilterSizeInput selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
              <FilerPriceInput
                minValue={minValue}
                maxValue={maxValue}
                setMinValue={setMinValue}
                setMaxValue={setMaxValue}
              />
              <button type='submit'>Apply</button>
              <button
                type='button'
                onClick={() =>
                  handleFormatReset(
                    setSelectedColor,
                    setSelectedSize,
                    setMinValue,
                    setMaxValue,
                    setProducts,
                    currentSubCategory,
                  )
                }
              >
                Reset
              </button>
            </form>
          </div>
          <div className={styles.products}>
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
