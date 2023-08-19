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

  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);

  const [lastNameError, setLastNameError] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);

  const validateEmail = (value: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!value) {
      setEmailError('Поле должно быть заполнено');
      setEmailValid(false);
    } else if (!emailPattern.test(value)) {
      setEmailError('Введите правильный адрес электронной почты');
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

  const validateFirstName = (value: string) => {
    const firstNamePattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setFirstNameError('Поле должно быть заполнено');
      setFirstNameValid(false);
    } else if (!firstNamePattern.test(value)) {
      setFirstNameError('Имя не должно содержать специальных символов или цифр');
      setFirstNameValid(false);
    } else {
      setFirstNameError('');
      setFirstNameValid(true);
    }
  };
  const validateLastName = (value: string) => {
    const lastNamePattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setLastNameError('Поле должно быть заполнено');
      setLastNameValid(false);
    } else if (!lastNamePattern.test(value)) {
      setLastNameError('Имя не должно содержать специальных символов или цифр');
      setLastNameValid(false);
    } else {
      setLastNameError('');
      setLastNameValid(true);
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
          onChange={(e) => {
            setEmail(e.target.value);
            // validateEmail(e.target.value);
          }}
          onBlur={() => {
            validateEmail(email);
            if (!email) {
              setEmailError('Поле должно быть заполнено');
              setEmailValid(false);
            }
          }}
          placeholder='email'
        />
        {emailError && !emailValid && <p className={styles.error__message}>{emailError}</p>}
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
          onChange={(e) => {
            setFirstName(e.target.value);
            if (!e.target.value) {
              setFirstNameError('Поле должно быть заполнено');
              setFirstNameValid(false);
            } else {
              validateFirstName(e.target.value);
            }
          }}
          onBlur={() => validateFirstName(firstName)}
          placeholder='First name'
        />
        {firstNameError && !firstNameValid && (
          <p className={styles.error__message}>{firstNameError}</p>
        )}
        <input
          type='text'
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (!e.target.value) {
              setLastNameError('Поле должно быть заполнено');
              setLastNameValid(false);
            } else {
              validateLastName(e.target.value);
            }
          }}
          onBlur={() => validateLastName(lastName)}
          placeholder='Last name'
        />
        {lastNameError && !lastNameValid && (
          <p className={styles.error__message}>{lastNameError}</p>
        )}
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
