import React from 'react';
import styles from './FilterInput.module.css';

function FilerPriceInput({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: {
  minValue: string;
  maxValue: string;
  setMinValue: React.Dispatch<React.SetStateAction<string>>;
  setMaxValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div style={{ width: '90%' }}>
      <p>Min Price:</p>
      <input
        style={{ width: '100%' }}
        className={styles.input}
        type='number'
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
      <p>Max Price:</p>
      <input
        style={{ width: '100%' }}
        className={styles.input}
        type='number'
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
      />
    </div>
  );
}

export default FilerPriceInput;
