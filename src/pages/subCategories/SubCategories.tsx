import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IProduct } from '../../types/product-types';
import styles from './SubCategories.module.css';
import Container from '../../components/layout/container/Container';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import useCategory from '../../core/hooks/useCategory';
import FilterColorInput from '../../components/ui/FilterInput/FilterColorInput';
import FilterSizeInput from '../../components/ui/FilterInput/FilterSizeInput';
import handleCurrentProductsByBrand from '../../core/utils/handleCurrentProductsByBrand';
import getProductByPrice from '../../core/utils/getProduct/getProductByPrice';

function SubCategories() {
  const { current, brand } = useParams();
  const currentCategory = useCategory(current);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('100');

  const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(event.target.value);
  };

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(event.target.value);
  };

  const handleFilterSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredProducts = { minPrice: minValue, maxPrice: maxValue };
    getProductByPrice(minValue, maxValue)
      .then((res) => {
        setProducts(res);
      })
      .catch(() => {});
    console.log('priced prod: ', products, 'filter: ', filteredProducts);
  };

  useEffect(() => {
    handleCurrentProductsByBrand(brand, setProducts);
    setSelectedColor('');
    setSelectedSize('');
  }, [brand]);

  return (
    <div>
      <SubCategoryBar currentCategory={currentCategory} />
      <Container>
        <div className={styles.products}>
          {products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/categories/${current}/${brand}/${product.key}`}
                className={styles.product}
                key={product.id}
              >
                <h4>{product.masterData.staged.name['en-US']}</h4>
                <img
                  className={styles.product__image}
                  src={product.masterData.staged.masterVariant.images[0].url}
                  alt='img'
                />
                <div>
                  <span>Price: </span>
                  <span>
                    {(
                      product.masterData.staged.masterVariant.prices[0].value.centAmount / 100
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div>Products not found</div>
          )}
        </div>
        <FilterColorInput
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setProducts={setProducts}
          brand={brand}
        />
        <FilterSizeInput
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          setProducts={setProducts}
          brand={brand}
        />
        <form onSubmit={handleFilterSubmit}>
          Min Price:
          <input type='number' value={minValue} onChange={handleMinValueChange} />
          Max Price:
          <input type='number' value={maxValue} onChange={handleMaxValueChange} />
          <button type='submit'>Apply Filter</button>
        </form>
      </Container>
    </div>
  );
}

export default SubCategories;
