import React from 'react';
import styles from './FilterInput.module.css';

function FilterSizeInput({
  selectedSize,
  setSelectedSize,
  value,
}: {
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  value: string[];
}) {
  return (
    <div>
      <p>Selected size: {selectedSize}</p>
      <select
        className={styles.input}
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
      >
        <option> </option>
        {value.map((el) => (
          <option key={el} value={el}>
            {el}&quot;
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSizeInput;
