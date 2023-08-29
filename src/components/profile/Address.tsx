import React, { useState } from 'react';
import { AddressWithID } from '../../types/types';
import getCustomerById from '../../core/services/getCustomerById';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';

function AddressComponent({ ...props }: AddressWithID) {
  const [isNotDefault, setIsDefault] = useState(true);
  const [isNotShipping, setIsNotShipping] = useState(true);
  const [isNotBilling, setIsNotBilling] = useState(true);
  const [newDefaultAddress, setNewDefaultAddress] = useState(false);
  const [userVersion, setUserVersion] = useState(0);
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [updateSuccess, toggleUpdateSuccess] = useState('');
  const [streetName, setStreetName] = useState(props.streetName);
  const [city, setCity] = useState(props.city);
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [country, setCountry] = useState(props.country);

  const userID = localStorage.getItem('userID') as string;

  function getUserInfo() {
    getCustomerById(userID).then(
      (result) => {
        if (
          result.defaultBillingAddressId === props.id ||
          result.defaultShippingAddressId === props.id
        ) {
          setIsDefault(false);
        }
        if (result.shippingAddressIds.includes(props.id)) {
          setIsNotShipping(false);
        }
        if (result.billingAddressIds.includes(props.id)) {
          setIsNotBilling(false);
        }
        setUserVersion(result.version);
      },
      () => {},
    );
  }
  getUserInfo();
  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function tryToUpdate() {
    const actions: Actions = [];
    actions.push({
      action: 'changeAddress',
      addressId: props.id,
      address: {
        streetName,
        city,
        postalCode,
        country,
      },
    });
    if (newDefaultAddress) {
      if (isNotShipping) {
        actions.push({
          action: 'setDefaultBillingAddress',
          addressId: props.id,
        });
      }
      if (isNotBilling) {
        actions.push({
          action: 'setDefaultShippingAddress',
          addressId: props.id,
        });
      }
    }
    updateUserByID(userID, userVersion, actions).then(
      () => {
        toggleUpdateSuccess('Address updated. Please wait until page reloads.');
        setTimeout(() => window.location.reload(), 2000);
      },
      () => {
        toggleUpdateSuccess('Error happened during update. Please reload this page and try again');
      },
    );
    changeInputDisabled(true);
    changeUpdateDisabled(false);
    changeSaveDisabled(true);
  }
  return (
    <div>
      <p hidden={isNotDefault}>This is default address</p>
      <span>City:</span>
      <input
        defaultValue={props.city}
        disabled={inputIsDisabled}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <p />
      <span>Street:</span>
      <input
        defaultValue={props.streetName}
        disabled={inputIsDisabled}
        onChange={(e) => {
          setStreetName(e.target.value);
        }}
      />
      <p />
      <span>Postal code:</span>
      <input
        defaultValue={props.postalCode}
        disabled={inputIsDisabled}
        onChange={(e) => {
          setPostalCode(e.target.value);
        }}
      />
      <p />
      <span> Country:</span>
      <select
        defaultValue={props.country}
        disabled={inputIsDisabled}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      >
        <option value='BY'>Belarus</option>
        <option value='US'>USA</option>
        <option value='RU'>Russia</option>
        <option value='CA'>Canada</option>
      </select>
      <div hidden={inputIsDisabled}>
        <label hidden={isNotShipping}>
          Set as new shipping address
          <input type='checkbox' onChange={(e) => setNewDefaultAddress(e.target.checked)} />
        </label>
        <label hidden={isNotBilling}>
          Set as new billing address
          <input type='checkbox' onChange={(e) => setNewDefaultAddress(e.target.checked)} />
        </label>
      </div>
      <div>
        <button type='button' onClick={enableInput} disabled={updateIsDisabled}>
          Edit
        </button>
        <button type='button' onClick={tryToUpdate} disabled={saveIsDisabled}>
          Save
        </button>
      </div>
      <p>{updateSuccess}</p>
    </div>
  );
}

export default AddressComponent;
