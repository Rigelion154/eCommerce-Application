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
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (value: string) => {
    const containUpperLetter = /[A-Z]/.test(value);
    const containLowerLetter = /[a-z]/.test(value);
    const containNumber = /\d/.test(value);

    if (value.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      setPasswordValid(false);
    } else if (!containUpperLetter || !containLowerLetter || !containNumber) {
      setPasswordError(
        'Пароль должен содержать минимум 1 заглавную букву, 1 строчную букву и 1 цифру',
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const submitRegistrationForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const countryCode = countryCodes[country] || '';

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
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          onBlur={() => {
            if (!password) {
              setPasswordError('Поле должно быть заполнено');
              setPasswordValid(false);
            }
          }}
          placeholder='password'
        />
        {passwordError && !passwordValid && (
          <p className={styles.error__message}>{passwordError}</p>
        )}
        <input
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='First name'
        />
        <input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Last name'
        />
        <input
          type='date'
          value={birthDay}
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            const isoDate = selectedDate.toISOString().split('T')[0];
            setBirthDay(isoDate);
          }}
          placeholder='Date of birth'
        />
        <div className={styles.address__field}>
          <p className={styles.address__title}>Address:</p>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder='Street'
          />
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
          />
          <input
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder='Postal code'
          />
          <input
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
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
