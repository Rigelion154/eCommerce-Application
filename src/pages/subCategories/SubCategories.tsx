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

function SubCategories() {
  const { current, brand } = useParams();
  const currentCategory = useCategory(current);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

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
      </Container>
    </div>
  );
}

export default SubCategories;
