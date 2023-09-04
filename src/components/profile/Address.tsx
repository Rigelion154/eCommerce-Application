import React, { useState } from 'react';
import { AddressWithID } from '../../types/types';
import getCustomerById from '../../core/services/getCustomerById';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import styles from './commonStyles.module.css';

function AddressComponent({ ...props }: AddressWithID) {
  const [isNotDefault, setIsDefault] = useState(true);
  const [isNotShipping, setIsNotShipping] = useState(true);
  const [isNotBilling, setIsNotBilling] = useState(true);

  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);

  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');

  const [streetName, setStreetName] = useState(props.streetName);
  const [city, setCity] = useState(props.city);
  const [postalCode, setPostalCode] = useState(props.postalCode);
  const [country, setCountry] = useState(props.country);

  const [postalCodeValue, setPostalCodeValue] = useState(props.postalCode);

  const [newDefaultAddress, setNewDefaultAddress] = useState(false);
  const [userVersion, setUserVersion] = useState(0);
  const [updateSuccess, toggleUpdateSuccess] = useState('');

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

  function tryToDelete() {
    const actions: Actions = [];
    actions.push({
      action: 'removeAddress',
      addressId: props.id,
    });
    updateUserByID(userID, userVersion, actions).then(
      () => {
        toggleUpdateSuccess('Address deleted. Please wait until page reloads.');
        setTimeout(() => window.location.reload(), 2000);
      },
      () => {
        toggleUpdateSuccess('Error happened during update. Please reload this page and try again');
      },
    );
  }

  return (
    <div className={styles.addressWrapper}>
      <p className={styles.headerDefault} hidden={isNotDefault}>
        This is default address
      </p>
      <div className={styles.addressLine}>
        <p>City</p>
        <input
          className={styles.input}
          defaultValue={props.city}
          disabled={inputIsDisabled}
          onChange={(e) => {
            setCity(e.target.value);
            checkCity(e.target.value);
          }}
        />
        <p className={styles.invalid}>{cityError}</p>
      </div>
      <div className={styles.addressLine}>
        <p>Street</p>
        <input
          className={styles.input}
          defaultValue={props.streetName}
          disabled={inputIsDisabled}
          onChange={(e) => {
            setStreetName(e.target.value);
            checkStreet(e.target.value);
          }}
        />
        <p className={styles.invalid}>{streetError}</p>
      </div>
      <div className={styles.addressLine}>
        <p>Postal code</p>
        <input
          className={styles.input}
          disabled={inputIsDisabled}
          value={postalCodeValue}
          onChange={(e) => {
            setPostalCode(e.target.value);
            setPostalCodeValue(e.target.value);
            checkPostalCode(e.target.value);
          }}
        />
        <p className={styles.invalid}>{postalCodeError}</p>
      </div>
      <div className={styles.addressLine}>
        <p>Country</p>
        <select
          className={styles.input}
          defaultValue={props.country}
          disabled={inputIsDisabled}
          onChange={(e) => {
            changeCountry(e.target.value);
          }}
        >
          <option value='BY'>Belarus</option>
          <option value='US'>USA</option>
          <option value='RU'>Russia</option>
          <option value='CA'>Canada</option>
        </select>
      </div>
      <div hidden={inputIsDisabled}>
        <label hidden={isNotShipping}>
          Set as new default shipping address
          <input
            className={styles.checkbox}
            type='checkbox'
            onChange={(e) => setNewDefaultAddress(e.target.checked)}
          />
        </label>
        <label hidden={isNotBilling}>
          Set as new default billing address
          <input
            className={styles.checkbox}
            type='checkbox'
            onChange={(e) => setNewDefaultAddress(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <button
          className={styles.btn}
          type='button'
          onClick={enableInput}
          disabled={updateIsDisabled}
        >
          Edit
        </button>
        <button
          className={styles.btn}
          type='button'
          onClick={tryToUpdate}
          disabled={saveIsDisabled}
        >
          Save
        </button>
      </div>
      <button className={styles.deleteBtn} type='button' onClick={tryToDelete}>
        Delete
      </button>
      <p className={styles.success}>{updateSuccess}</p>
    </div>
  );
}

export default AddressComponent;
