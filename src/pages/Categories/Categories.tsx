import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCategory from '../../core/hooks/useCategory';
import SubCategoryBar from '../../components/ui/subCategoryBar/SubCategoryBar';
import Container from '../../components/layout/container/Container';
import { MasterData } from '../../types/product-types';
import ProductCard from '../../components/ui/ProductCard/ProductCard';

import styles from './Categories.module.css';
import handleProductsByCategory from '../../core/services/getProductsFromApi/getProductsByCategory';

function Categories() {
  const { current } = useParams();
  const currentCategory = useCategory(current);
  const [products, setProducts] = useState<MasterData[]>([]);

  useEffect(() => {
    handleProductsByCategory(currentCategory, setProducts);
  }, [currentCategory]);

  return (
    <div>
      <SubCategoryBar currentCategory={currentCategory} />
      <Container>
        <div className={styles.wrapper}>
          {products.map((product) => (
            <ProductCard
              current={current}
              brand={product.key.split('_')[0]}
              product={product}
              key={product.id}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Categories;
