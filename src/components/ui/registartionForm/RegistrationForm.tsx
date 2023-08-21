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
  const [shippingDefaultAddress, setShippingDefaultAddress] = useState(false);
  const [billingDefaultAddress, setBillingDefaultAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);

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
            if (error instanceof Error) throw new Error('Registration error');
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
        />
        <div className={styles.checkboxes__block_shipping}>
          <div className={styles.checkbox__default_block}>
            <label className={styles.checkbox__label} htmlFor='defaultShippingAddress'>
              <input
                type='checkbox'
                checked={shippingDefaultAddress}
                onChange={(e) => setShippingDefaultAddress(e.target.checked)}
              />
              <span>Default address</span>
            </label>
          </div>

          <div className={styles.checkbox__show_billing}>
            <label className={styles.checkbox__label} htmlFor='showBillingAddress'>
              <input
                type='checkbox'
                checked={billingAddress}
                onChange={(e) => {
                  setBillingAddress(e.target.checked);
                  setShowBillingAddress(e.target.checked);
                }}
              />
              <span>Add billing address</span>
            </label>
          </div>
        </div>

        {showBillingAddress && (
          <div>
            <p className={styles.address__title}>Billing address:</p>
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
            />
            <div className={styles.checkbox__default_block_shipping}>
              <label className={styles.checkbox__label} htmlFor='defaultBillingAddress'>
                <input
                  type='checkbox'
                  checked={billingDefaultAddress}
                  onChange={(e) => setBillingDefaultAddress(e.target.checked)}
                />
                <span>Default address</span>
              </label>
            </div>
          </div>
        )}

        <button type='submit' className={styles.sign__btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
