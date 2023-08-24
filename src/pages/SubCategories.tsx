import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getProductByBrand from '../core/utils/getProductByBrand';
import { IProduct } from '../types/product-types';

function SubCategories() {
  const { slug } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProductByBrand(slug)
      .then((res) => setProducts(res))
      .catch(() => {});
  }, [slug]);

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => <div key={product.id}>{product.key}</div>)
      ) : (
        <div>Products not found</div>
      )}
    </div>
  );
}

export default SubCategories;
