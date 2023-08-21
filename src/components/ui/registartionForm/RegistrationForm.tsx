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
  const [email] = useState('');
  const [password] = useState('');
  const [firstName] = useState('');
  const [lastName] = useState('');
  const [birthDay] = useState('');
  const [street] = useState('');
  const [city] = useState('');
  const [initialSelectedCountry] = useState('Belarus');
  const [selectedCountry] = useState('');
  const [postalCode] = useState('');

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
        <PersonalForm />
        <AddressForm />

        <button type='submit' className={styles.sign__btn}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
