import React from 'react';
import { useParams } from 'react-router-dom';

function Category() {
  const { name, id } = useParams();
  return (
    <div>
      {name}
      {id}
      <h2>Apple</h2>
      <h2>Sa</h2>
      <h2>Apple</h2>
    </div>
  );
}

export default Category;
