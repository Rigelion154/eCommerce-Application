import React from 'react';

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
    <div>
      <p>Min Price:</p>
      <input type='number' value={minValue} onChange={(e) => setMinValue(e.target.value)} />
      <p>Max Price:</p>
      <input type='number' value={maxValue} onChange={(e) => setMaxValue(e.target.value)} />
    </div>
  );
}

export default FilerPriceInput;
