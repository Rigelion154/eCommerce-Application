import React from 'react';

function FilterSizeInput({
  selectedSize,
  setSelectedSize,
}: {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <p>Selected size: {selectedSize}</p>
      <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
        <option> </option>
        <option value='6.5'>6.5&quot;</option>
        <option value='7.2'>7.2&quot;</option>
      </select>
    </div>
  );
}

export default FilterSizeInput;
