import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';
import { ICustomerGetInfo } from '../../types/customers-types';

function NewAddress({ userID, userVersion, ...props }: ProfileAttributes) {
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');

  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [notShipping, switchNotShipping] = useState(false);
  const [notBilling, switchNotBilling] = useState(true);
  const [newDefaultAddress, setNewDefaultAddress] = useState(false);

  const [saveIsDisabled, changeSaveDisabled] = useState(false);

  const [postalCodeValue, setPostalCodeValue] = useState('');

  const [updateSuccess, toggleUpdateSuccess] = useState('');

  function checkCity(value: string) {
    changeSaveDisabled(false);
    setCityError('');
    const validRegex = /^[a-zA-Zа-яА-Я]*$/;
    if (!value) {
      setCityError('This field is required');
      changeSaveDisabled(true);
    } else if (!value.match(validRegex)) {
      setCityError('The field must not have any special characters or numbers');
      changeSaveDisabled(true);
    }
  }

  function checkStreet(value: string) {
    changeSaveDisabled(false);
    setStreetError('');
    const validRegex = /^[a-zA-Zа-яА-Я]*$/;
    if (!value) {
      setStreetError('This field is required');
      changeSaveDisabled(true);
    } else if (!value.match(validRegex)) {
      setStreetError('The field must not have any special characters or numbers');
      changeSaveDisabled(true);
    }
  }

  function checkPostalCode(value: string) {
    let postalCodePattern: RegExp = /^$/;
    setPostalCodeError('');
    changeSaveDisabled(false);
    if (!value) {
      setPostalCodeError('This field is required');
      changeSaveDisabled(true);
    } else {
      if (country === 'BY' || country === 'RU') {
        postalCodePattern = /^\d{6}$/;
      } else if (country === 'US') {
        postalCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
      } else if (country === 'CA') {
        postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      }
      if (!postalCodePattern.test(value)) {
        setPostalCodeError('Postal code does not match the format');
        changeSaveDisabled(true);
      }
    }
  }

  function changeCountry(value: string) {
    setCountry(value);
    setPostalCodeValue('');
    setPostalCodeError('This field is required');
    changeSaveDisabled(true);
  }

  function tryToSave() {
    const actions: Actions = [];
    actions.push({
      action: 'addAddress',
      address: {
        streetName,
        city,
        postalCode,
        country,
      },
    });
    updateUserByID(userID, userVersion, actions).then(
      (result) => {
        const res = result as ICustomerGetInfo;
        const newAddress = res.addresses.at(-1);
        if (newAddress) {
          actions.pop();
          actions.push({
            action: notShipping ? 'addBillingAddressId' : 'addShippingAddressId',
            addressId: newAddress.id,
          });
          if (newDefaultAddress) {
            if (notShipping) {
              actions.push({
                action: 'setDefaultBillingAddress',
                addressId: newAddress.id,
              });
            }
            if (notBilling) {
              actions.push({
                action: 'setDefaultShippingAddress',
                addressId: newAddress.id,
              });
            }
          }
        }
        updateUserByID(userID, (userVersion as number) + 1, actions).then(
          () => {
            toggleUpdateSuccess('Address updated. Please wait until page reloads.');
            setTimeout(() => window.location.reload(), 2000);
          },
          () => {
            toggleUpdateSuccess(
              'Error happened during update. Please reload this page and try again',
            );
          },
        );
      },
      () => {
        toggleUpdateSuccess('Error happened during update. Please reload this page and try again');
      },
    );
  }

  function changeType(value: string) {
    if (value === 'Billing') {
      switchNotShipping(true);
      switchNotBilling(false);
    } else {
      switchNotShipping(false);
      switchNotBilling(true);
    }
  }

  return (
    <div hidden={props.hidden}>
      <span>City:</span>
      <input
        name='asdaasdas213123d'
        onChange={(e) => {
          setCity(e.target.value);
          checkCity(e.target.value);
        }}
      />
      <span>{cityError}</span>
      <p />
      <span>Street:</span>
      <input
        name='asdaasdasd123123'
        onChange={(e) => {
          setStreetName(e.target.value);
          checkStreet(e.target.value);
        }}
      />
      <span>{streetError}</span>
      <p />
      <span>Postal code:</span>
      <input
        name='asdaa1231sdasd'
        value={postalCodeValue}
        onChange={(e) => {
          setPostalCode(e.target.value);
          setPostalCodeValue(e.target.value);
          checkPostalCode(e.target.value);
        }}
      />
      <span>{postalCodeError}</span>
      <p />
      <span> Country:</span>
      <select
        onChange={(e) => {
          changeCountry(e.target.value);
        }}
      >
        <option value='BY'>Belarus</option>
        <option value='US'>USA</option>
        <option value='RU'>Russia</option>
        <option value='CA'>Canada</option>
      </select>
      <p />
      <select
        onChange={(e) => {
          changeType(e.target.value);
        }}
      >
        <option value='Shipping'>Shipping address</option>
        <option value='Billing'>Billing address</option>
      </select>
      <div>
        <label hidden={notShipping}>
          Set as new default shipping address
          <input
            name='asda1121asdasd'
            type='checkbox'
            onChange={(e) => setNewDefaultAddress(e.target.checked)}
          />
        </label>
        <label hidden={notBilling}>
          Set as new default billing address
          <input
            name='asda121231asdasd'
            type='checkbox'
            onChange={(e) => setNewDefaultAddress(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <button type='button' onClick={tryToSave} disabled={saveIsDisabled}>
          Save
        </button>
      </div>
      <p>{updateSuccess}</p>
    </div>
  );
}

export default NewAddress;
