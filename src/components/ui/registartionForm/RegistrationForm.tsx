import React, { useState } from 'react';

import styles from './RegistrationForm.module.css';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  return (
    <div>
      <form className={styles.registration__form}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'
        />
        <input
          type='password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder='password'
        />
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
          onChange={(e) => setBirthDay(e.target.value)}
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
