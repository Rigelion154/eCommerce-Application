import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../types/product-types';
import getProductByKey from '../../core/utils/getProductByKey';

function ProductPage() {
  const { key } = useParams();
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    getProductByKey(key)
      .then((res) => setProduct(res))
      .catch(() => {});
  }, [key]);
  return (
    <div>
      {product.map((elem) => (
        <div key={elem.id}>{elem.key}</div>
      ))}
    </div>
  );
}

export default ProductPage;
