import React from 'react';
import getProductByAttribute from '../../../core/utils/getProduct/getProductByAttribute';
import { IProduct } from '../../../types/product-types';
import handleCurrentProductsByBrand from '../../../core/utils/handleCurrentProductsByBrand';

function FilterColorInput({
  selectedColor,
  setSelectedColor,
  setProducts,
  brand,
}: {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  brand: string | undefined;
}) {
  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value;
    setSelectedColor(color);
    if (color === '') {
      handleCurrentProductsByBrand(brand, setProducts);
    } else
      getProductByAttribute('phone_color', event.target.value)
        .then((res) => setProducts(res))
        .catch(() => {});
  };

  return (
    <div>
      <select value={selectedColor} onChange={handleColorChange}>
        <option value=''>Select a color</option>
        <option value='white'>White</option>
        <option value='black'>Black</option>
      </select>
      <p>Selected color: {selectedColor}</p>
    </div>
  );
}

export default FilterColorInput;
