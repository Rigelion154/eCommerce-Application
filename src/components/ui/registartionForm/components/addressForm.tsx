import React from 'react';
import styles from '../RegistrationForm.module.css';

interface AddressFormProps {
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  streetError: string;
  setStreetError: React.Dispatch<React.SetStateAction<string>>;
  streetValid: boolean;
  setStreetValid: React.Dispatch<React.SetStateAction<boolean>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  cityError: string;
  setCityError: React.Dispatch<React.SetStateAction<string>>;
  cityValid: boolean;
  setCityValid: React.Dispatch<React.SetStateAction<boolean>>;
  initialSelectedCountry: string;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  postalCodeError: string;
  setPostalCodeError: React.Dispatch<React.SetStateAction<string>>;
  postalCodeValid: boolean;
  setPostalCodeValid: React.Dispatch<React.SetStateAction<boolean>>;
  defaultAddress: boolean;
  setDefaultAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressForm(props: AddressFormProps) {
  const {
    street,
    setStreet,
    streetError,
    setStreetError,
    streetValid,
    setStreetValid,
    city,
    setCity,
    cityError,
    setCityError,
    cityValid,
    setCityValid,
    initialSelectedCountry,
    selectedCountry,
    setSelectedCountry,
    postalCode,
    setPostalCode,
    postalCodeError,
    setPostalCodeError,
    postalCodeValid,
    setPostalCodeValid,
    defaultAddress,
    setDefaultAddress,
  } = props;

  const validateCity = (value: string) => {
    const cityPattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setCityError('This field is required');
      setCityValid(false);
    } else if (!cityPattern.test(value)) {
      setCityError('The field must not have any special characters or numbers');
      setCityValid(false);
    } else {
      setCityError('');
      setCityValid(true);
    }
  };

  const validatePostalCode = (countryValue: string, postalCodeValue: string) => {
    const trimmedPostalCode = postalCodeValue.trim();
    let postalCodePattern: RegExp = /^$/;

    if (!trimmedPostalCode) {
      setPostalCodeError('This field is required');
      setPostalCodeValid(false);
    } else {
      if (!selectedCountry || selectedCountry === 'Belarus' || selectedCountry === 'Russia') {
        postalCodePattern = /^\d{6}$/;
      } else if (selectedCountry === 'USA') {
        postalCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
      } else if (selectedCountry === 'Canada') {
        postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      }

      if (!postalCodePattern.test(trimmedPostalCode)) {
        setPostalCodeError('Postal code does not match the format');
        setPostalCodeValid(false);
      } else {
        setPostalCodeError('');
        setPostalCodeValid(true);
      }
    }
  };

  return (
    <div className={styles.address__field}>
      {streetError && !streetValid && <p className={styles.error__message}>{streetError}</p>}
      <input
        type='text'
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        onBlur={() => {
          if (!street) {
            setStreetError('This field is required');
            setStreetValid(false);
          } else {
            setStreetError('');
            setStreetValid(true);
          }
        }}
        className={streetError && !streetValid ? styles.invalid : ''}
        placeholder='Street'
      />
      {cityError && !cityValid && <p className={styles.error__message}>{cityError}</p>}
      <input
        type='text'
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          if (!e.target.value) {
            setCityError('This field is required');
            setCityValid(false);
          } else {
            validateCity(e.target.value);
          }
        }}
        onBlur={() => validateCity(city)}
        className={cityError && !cityValid ? styles.invalid : ''}
        placeholder='City'
      />
      <select
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setPostalCode('');
          setPostalCodeValid(true);
        }}
      >
        <option value='Belarus'>Belarus</option>
        <option value='USA'>USA</option>
        <option value='Russia'>Russia</option>
        <option value='Canada'>Canada</option>
      </select>
      {postalCodeError && !postalCodeValid && (
        <p className={styles.error__message}>{postalCodeError}</p>
      )}
      <input
        type='text'
        value={postalCode}
        onChange={(e) => {
          setPostalCode(e.target.value);
          if (!selectedCountry) {
            validatePostalCode(initialSelectedCountry, e.target.value);
          } else {
            validatePostalCode(selectedCountry, e.target.value);
          }
        }}
        onBlur={() => {
          if (!selectedCountry) {
            validatePostalCode(initialSelectedCountry, postalCode);
          } else {
            validatePostalCode(selectedCountry, postalCode);
          }
        }}
        className={postalCodeError && !postalCodeValid ? styles.invalid : ''}
        placeholder='postal code'
      />
      <div className={styles.checkbox__block}>
        <label className={styles.checkbox__label} htmlFor='defaultAddressCheckbox'>
          <input
            type='checkbox'
            checked={defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.checked)}
          />
          <span>Default address</span>
        </label>
      </div>
    </div>
  );
}

export default AddressForm;
