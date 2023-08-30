import React from 'react';

function FilterColorInput({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <p>Selected color: {selectedColor}</p>
      <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
        <option> </option>
        <option value='white'>White</option>
        <option value='black'>Black</option>
      </select>
    </div>
  );
}

export default FilterColorInput;
