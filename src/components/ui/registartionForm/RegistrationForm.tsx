import React, { useState } from 'react';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, projectKey } from '../../../BuildClient';
import { ClientData } from '../../../types/types';
import countryCodes from './countryCodes';

import styles from './RegistrationForm.module.css';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [initialSelectedCountry] = useState('Belarus');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);

  const [lastNameError, setLastNameError] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);

  const [streetError, setStreetError] = useState('');
  const [streetValid, setStreetValid] = useState(false);

  const [cityError, setCityError] = useState('');
  const [cityValid, setCityValid] = useState(false);

  const [birthDayError, setBirthDayError] = useState('');
  const [birthDayValid, setBirthDayValid] = useState(false);

  const [postalCodeError, setPostalCodeError] = useState('');
  const [postalCodeValid, setPostalCodeValid] = useState(false);

  const validateEmail = (value: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!value) {
      setEmailError('This field is required');
      setEmailValid(false);
    } else if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const validatePassword = (value: string) => {
    const containUpperLetter = /[A-Z]/.test(value);
    const containLowerLetter = /[a-z]/.test(value);
    const containNumber = /\d/.test(value);

    if (value.length < 8) {
      setPasswordError('Password must contain at least 8 characters');
      setPasswordValid(false);
    } else if (!containUpperLetter || !containLowerLetter || !containNumber) {
      setPasswordError(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number',
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const validateFirstName = (value: string) => {
    const firstNamePattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setFirstNameError('This field is required');
      setFirstNameValid(false);
    } else if (!firstNamePattern.test(value)) {
      setFirstNameError('The field must not have any special characters or numbers');
      setFirstNameValid(false);
    } else {
      setFirstNameError('');
      setFirstNameValid(true);
    }
  };

  const validateLastName = (value: string) => {
    const lastNamePattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setLastNameError('This field is required');
      setLastNameValid(false);
    } else if (!lastNamePattern.test(value)) {
      setLastNameError('The field must not have any special characters or numbers');
      setLastNameValid(false);
    } else {
      setLastNameError('');
      setLastNameValid(true);
    }
  };

  const validateBirthDay = (value: string) => {
    if (!value) {
      setBirthDayError('This field is required');
      setBirthDayValid(false);
    } else {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const minAge = new Date();
      minAge.setFullYear(currentDate.getFullYear() - 12);

      if (selectedDate > currentDate) {
        setBirthDayError('Date cannot be in the future');
        setBirthDayValid(false);
      } else if (selectedDate > minAge) {
        setBirthDayError('User must be over 12 years old');
        setBirthDayValid(false);
      } else {
        setBirthDayError('');
        setBirthDayValid(true);
      }
    }
  };

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

  const submitRegistrationForm = async (e: React.FormEvent) => {
    e.preventDefault();

    let countryCode;

    if (!selectedCountry) {
      countryCode = countryCodes[initialSelectedCountry];
    } else {
      countryCode = countryCodes[selectedCountry];
    }

    const newClientData: ClientData = {
      email,
      password,
      firstName,
      lastName,
      birthDay,
      addresses: [
        {
          streetName: street,
          city,
          postalCode,
          country: countryCode,
        },
      ],
    };

    const createCustomer = () => {
      return apiRoot
        .customers()
        .post({
          body: newClientData,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .execute();
    };

    await createCustomer();
  };

  return (
    <div>
      <form
        className={styles.registration__form}
        onSubmit={(e) => {
          e.preventDefault();
          submitRegistrationForm(e).catch((error) => {
            console.error('Error submitting form:', error);
          });
        }}
      >
        {emailError && !emailValid && <p className={styles.error__message}>{emailError}</p>}
        <input
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // validateEmail(e.target.value);
          }}
          onBlur={() => {
            validateEmail(email);
            if (!email) {
              setEmailError('This field is required');
              setEmailValid(false);
            }
          }}
          className={emailError && !emailValid ? styles.invalid : ''}
          placeholder='email'
        />
        {passwordError && !passwordValid && (
          <p className={styles.error__message}>{passwordError}</p>
        )}
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          onBlur={() => {
            if (!password) {
              setPasswordError('This field is required');
              setPasswordValid(false);
            }
          }}
          className={passwordError && !passwordValid ? styles.invalid : ''}
          placeholder='password'
        />
        {firstNameError && !firstNameValid && (
          <p className={styles.error__message}>{firstNameError}</p>
        )}
        <input
          type='text'
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (!e.target.value) {
              setFirstNameError('This field is required');
              setFirstNameValid(false);
            } else {
              validateFirstName(e.target.value);
            }
          }}
          onBlur={() => validateFirstName(firstName)}
          className={firstNameError && !firstNameValid ? styles.invalid : ''}
          placeholder='First name'
        />
        {lastNameError && !lastNameValid && (
          <p className={styles.error__message}>{lastNameError}</p>
        )}
        <input
          type='text'
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (!e.target.value) {
              setLastNameError('This field is required');
              setLastNameValid(false);
            } else {
              validateLastName(e.target.value);
            }
          }}
          onBlur={() => validateLastName(lastName)}
          className={lastNameError && !lastNameValid ? styles.invalid : ''}
          placeholder='Last name'
        />
        {birthDayError && !birthDayValid && (
          <p className={styles.error__message}>{birthDayError}</p>
        )}
        <input
          type='date'
          value={birthDay}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const isoDate = selectedDate.toISOString().split('T')[0];
            setBirthDay(isoDate);
          }}
          onBlur={() => validateBirthDay(birthDay)}
          className={birthDayError && !birthDayValid ? styles.invalid : ''}
          placeholder='Date of birth'
        />

        <div className={styles.address__field}>
          <p className={styles.address__title}>Address:</p>
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
        </div>
        <button type='submit' className={styles.sign__btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
