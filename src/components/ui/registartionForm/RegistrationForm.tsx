import React, { useState } from 'react';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient, projectKey } from '../../../BuildClient';
import { ClientData } from '../../../types/types';
import countryCodes from './countryCodes';
import AddressForm from './components/addressForm';
import PersonalForm from './components/personalForm';

import styles from './RegistrationForm.module.css';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [initialSelectedCountry] = useState('Belarus');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);

  const [lastNameError, setLastNameError] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);

  const [birthDayError, setBirthDayError] = useState('');
  const [birthDayValid, setBirthDayValid] = useState(false);

  const [streetError, setStreetError] = useState('');
  const [streetValid, setStreetValid] = useState(false);

  const [cityError, setCityError] = useState('');
  const [cityValid, setCityValid] = useState(false);

  const [postalCodeError, setPostalCodeError] = useState('');
  const [postalCodeValid, setPostalCodeValid] = useState(false);

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
    <div className={styles.registration__form_block}>
      <form
        className={styles.registration__form}
        onSubmit={(e) => {
          e.preventDefault();
          submitRegistrationForm(e).catch((error) => {
            console.error('Error submitting form:', error);
          });
        }}
      >
        <PersonalForm
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
          emailValid={emailValid}
          setEmailValid={setEmailValid}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          passwordValid={passwordValid}
          setPasswordValid={setPasswordValid}
          passwordError={passwordError}
          setPasswordError={setPasswordError}
          firstName={firstName}
          setFirstName={setFirstName}
          firstNameError={firstNameError}
          setFirstNameError={setFirstNameError}
          firstNameValid={firstNameValid}
          setFirstNameValid={setFirstNameValid}
          lastName={lastName}
          setLastName={setLastName}
          lastNameError={lastNameError}
          setLastNameError={setLastNameError}
          lastNameValid={lastNameValid}
          setLastNameValid={setLastNameValid}
          birthDay={birthDay}
          setBirthDay={setBirthDay}
          birthDayError={birthDayError}
          setBirthDayError={setBirthDayError}
          birthDayValid={birthDayValid}
          setBirthDayValid={setBirthDayValid}
        />
        <p className={styles.address__title}>Shipping address:</p>
        <AddressForm
          street={street}
          setStreet={setStreet}
          streetError={streetError}
          setStreetError={setStreetError}
          streetValid={streetValid}
          setStreetValid={setStreetValid}
          city={city}
          setCity={setCity}
          cityError={cityError}
          setCityError={setCityError}
          cityValid={cityValid}
          setCityValid={setCityValid}
          initialSelectedCountry={initialSelectedCountry}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          postalCodeError={postalCodeError}
          setPostalCodeError={setPostalCodeError}
          postalCodeValid={postalCodeValid}
          setPostalCodeValid={setPostalCodeValid}
          defaultAddress={defaultAddress}
          setDefaultAddress={setDefaultAddress}
        />
        <div className={`${styles.checkbox__block} ${styles.checkbox__block_billing}`}>
          <label className={styles.checkbox__label} htmlFor='billingAddressCheckbox'>
            <input
              type='checkbox'
              checked={billingAddress}
              onChange={(e) => setBillingAddress(e.target.checked)}
            />
            <span>Add billing address</span>
          </label>
        </div>

        <button type='submit' className={styles.sign__btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
