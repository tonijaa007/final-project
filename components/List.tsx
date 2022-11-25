import React from 'react';
import { getProducts } from '../database/connect';

function List(props) {
  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

export default List;
