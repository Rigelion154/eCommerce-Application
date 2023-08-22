import React from 'react';
import styles from '../RegistrationForm.module.css';

interface BillingAddressFormProps {
  billingStreet: string;
  setBillingStreet: React.Dispatch<React.SetStateAction<string>>;
  billingStreetError: string;
  setBillingStreetError: React.Dispatch<React.SetStateAction<string>>;
  billingStreetValid: boolean;
  setBillingStreetValid: React.Dispatch<React.SetStateAction<boolean>>;
  billingCity: string;
  setBillingCity: React.Dispatch<React.SetStateAction<string>>;
  billingCityError: string;
  setBillingCityError: React.Dispatch<React.SetStateAction<string>>;
  billingCityValid: boolean;
  setBillingCityValid: React.Dispatch<React.SetStateAction<boolean>>;
  billingInitialSelectedCountry: string;
  billingSelectedCountry: string;
  setBillingSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  billingPostalCode: string;
  setBillingPostalCode: React.Dispatch<React.SetStateAction<string>>;
  billingPostalCodeError: string;
  setBillingPostalCodeError: React.Dispatch<React.SetStateAction<string>>;
  billingPostalCodeValid: boolean;
  setBillingPostalCodeValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function BillingAddressForm(props: BillingAddressFormProps) {
  const {
    billingStreet,
    setBillingStreet,
    billingStreetError,
    setBillingStreetError,
    billingStreetValid,
    setBillingStreetValid,
    billingCity,
    setBillingCity,
    billingCityError,
    setBillingCityError,
    billingCityValid,
    setBillingCityValid,
    billingInitialSelectedCountry,
    billingSelectedCountry,
    setBillingSelectedCountry,
    billingPostalCode,
    setBillingPostalCode,
    billingPostalCodeError,
    setBillingPostalCodeError,
    billingPostalCodeValid,
    setBillingPostalCodeValid,
  } = props;

  const validateCity = (value: string) => {
    const cityPattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setBillingCityError('This field is required');
      setBillingCityValid(false);
    } else if (!cityPattern.test(value)) {
      setBillingCityError('The field must not have any special characters or numbers');
      setBillingCityValid(false);
    } else {
      setBillingCityError('');
      setBillingCityValid(true);
    }
  };

  const validatePostalCode = (countryValue: string, postalCodeValue: string) => {
    const trimmedPostalCode = postalCodeValue.trim();
    let postalCodePattern: RegExp = /^$/;

    if (!trimmedPostalCode) {
      setBillingPostalCodeError('This field is required');
      setBillingPostalCodeValid(false);
    } else {
      if (
        !billingSelectedCountry ||
        billingSelectedCountry === 'Belarus' ||
        billingSelectedCountry === 'Russia'
      ) {
        postalCodePattern = /^\d{6}$/;
      } else if (billingSelectedCountry === 'USA') {
        postalCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
      } else if (billingSelectedCountry === 'Canada') {
        postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      }

      if (!postalCodePattern.test(trimmedPostalCode)) {
        setBillingPostalCodeError('Postal code does not match the format');
        setBillingPostalCodeValid(false);
      } else {
        setBillingPostalCodeError('');
        setBillingPostalCodeValid(true);
      }
    }
  };

  return (
    <div className={styles.address__field}>
      {billingStreetError && !billingStreetValid && (
        <p className={styles.error__message}>{billingStreetError}</p>
      )}
      <input
        type='text'
        value={billingStreet}
        onChange={(e) => setBillingStreet(e.target.value)}
        onBlur={() => {
          if (!billingStreet) {
            setBillingStreetError('This field is required');
            setBillingStreetValid(false);
          } else {
            setBillingStreetError('');
            setBillingStreetValid(true);
          }
        }}
        className={billingStreetError && !billingStreetValid ? styles.invalid : ''}
        placeholder='Street'
      />
      {billingCityError && !billingCityValid && (
        <p className={styles.error__message}>{billingCityError}</p>
      )}
      <input
        type='text'
        value={billingCity}
        onChange={(e) => {
          setBillingCity(e.target.value);
          if (!e.target.value) {
            setBillingCityError('This field is required');
            setBillingCityValid(false);
          } else {
            validateCity(e.target.value);
          }
        }}
        onBlur={() => validateCity(billingCity)}
        className={billingCityError && !billingCityValid ? styles.invalid : ''}
        placeholder='City'
      />
      <select
        value={billingSelectedCountry}
        onChange={(e) => {
          setBillingSelectedCountry(e.target.value);
          setBillingPostalCode('');
          setBillingPostalCodeValid(true);
        }}
      >
        <option value='Belarus'>Belarus</option>
        <option value='USA'>USA</option>
        <option value='Russia'>Russia</option>
        <option value='Canada'>Canada</option>
      </select>
      {billingPostalCodeError && !billingPostalCodeValid && (
        <p className={styles.error__message}>{billingPostalCodeError}</p>
      )}
      <input
        type='text'
        value={billingPostalCode}
        onChange={(e) => {
          setBillingPostalCode(e.target.value);
          if (!billingSelectedCountry) {
            validatePostalCode(billingInitialSelectedCountry, e.target.value);
          } else {
            validatePostalCode(billingSelectedCountry, e.target.value);
          }
        }}
        onBlur={() => {
          if (!billingSelectedCountry) {
            validatePostalCode(billingInitialSelectedCountry, billingPostalCode);
          } else {
            validatePostalCode(billingSelectedCountry, billingPostalCode);
          }
        }}
        className={billingPostalCodeError && !billingPostalCodeValid ? styles.invalid : ''}
        placeholder='postal code'
      />
    </div>
  );
}

export default BillingAddressForm;
