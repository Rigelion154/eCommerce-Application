import React from 'react';
import getProductByAttribute from '../../../core/utils/getProduct/getProductByAttribute';
import { IProduct } from '../../../types/product-types';
import handleCurrentProductsByBrand from '../../../core/utils/handleCurrentProductsByBrand';

function FilterSizeInput({
  selectedSize,
  setSelectedSize,
  setProducts,
  brand,
}: {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  brand: string | undefined;
}) {
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setSelectedSize(size);
    if (size === '') {
      handleCurrentProductsByBrand(brand, setProducts);
    } else
      getProductByAttribute('screen_size', +event.target.value)
        .then((res) => setProducts(res))
        .catch(() => {});
  };

  return (
    <div>
      <select value={selectedSize} onChange={handleSizeChange}>
        <option value=''>Select a screen size</option>
        <option value='6.5'>6.5&quot;</option>
        <option value='7.2'>7.2&quot;</option>
      </select>
      <p>Selected size: {selectedSize}</p>
    </div>
  );
}

export default FilterSizeInput;
