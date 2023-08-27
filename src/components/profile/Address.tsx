import React from 'react';
import { Address } from '../../types/types';

function AddressComponent({ ...props }: Address) {
  return (
    <div>
      <span>City:</span>
      <input defaultValue={props.city} />
      <p />
      <span>Street:</span>
      <input defaultValue={props.streetName} />
      <p />
      <span>Postal code:</span>
      <input defaultValue={props.postalCode} />
      <p />
      <span> Country:</span>
      <select defaultValue={props.country}>
        <option value='Belarus'>Belarus</option>
        <option value='USA'>USA</option>
        <option value='Russia'>Russia</option>
        <option value='Canada'>Canada</option>
      </select>
    </div>
  );
}

export default AddressComponent;
