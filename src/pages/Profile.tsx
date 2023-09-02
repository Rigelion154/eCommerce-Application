import React, { useState } from 'react';
import Container from '../components/layout/container/Container';
import EmailAttribute from '../components/profile/EmailAttribute';
import AddressComponent from '../components/profile/Address';
import getCustomerById from '../core/services/getCustomerById';
import FirstNameAttribute from '../components/profile/FirstNameAttribute';
import LastNameAttribute from '../components/profile/LastNameAttribute';
import DateOfBirthAttribute from '../components/profile/DateOfBirthAttribute';
import { AddressWithID } from '../types/types';
import NewAddress from '../components/profile/NewAddress';

function Profile() {
  const isAuth = localStorage.getItem('isAuth');
  const userID = localStorage.getItem('userID');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [userVersion, setUserVersion] = useState(0);
  const [shippingAddresses] = useState<AddressWithID[]>([]);
  const [billingAddresses] = useState<AddressWithID[]>([]);
  const [addNewAddress, setAddNewAddress] = useState(true);

  if (isAuth === 'true' && userID) {
    getCustomerById(userID).then(
      (result) => {
        setEmail(result.email);
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setdateOfBirth(result.dateOfBirth);
        setUserVersion(result.version);
        result.addresses.forEach((address) => {
          if (
            result.defaultShippingAddressId &&
            result.defaultShippingAddressId.includes(address.id)
          ) {
            shippingAddresses.unshift(address);
          } else if (result.shippingAddressIds.includes(address.id)) {
            shippingAddresses.push(address);
          }
          if (
            result.defaultBillingAddressId &&
            result.defaultBillingAddressId.includes(address.id)
          ) {
            billingAddresses.unshift(address);
          } else if (result.billingAddressIds.includes(address.id)) {
            billingAddresses.push(address);
          }
        });
      },
      () => new Error(`Couldn't receive user information!`),
    );
  }

  function switchNewAddress() {
    if (addNewAddress) {
      setAddNewAddress(false);
    } else {
      setAddNewAddress(true);
    }
  }
  return (
    <div>
      <Container>
        <header>Your profile</header>
        <EmailAttribute value={email} userID={userID} userVersion={userVersion} />
        <FirstNameAttribute value={firstName} userID={userID} userVersion={userVersion} />
        <LastNameAttribute value={lastName} userID={userID} userVersion={userVersion} />
        <DateOfBirthAttribute value={dateOfBirth} userID={userID} userVersion={userVersion} />
        <div>
          <button type='button' onClick={switchNewAddress}>
            {addNewAddress ? 'Add new address' : 'Cancel'}
          </button>
          <NewAddress userID={userID} userVersion={userVersion} hidden={addNewAddress} />
          <header>Shipping addresses</header>
          {shippingAddresses.map((address) => (
            <AddressComponent
              country={address.country}
              city={address.city}
              postalCode={address.postalCode}
              streetName={address.streetName}
              key={address.id}
              id={address.id}
            />
          ))}
        </div>
        <div>
          <header>Billing addresses</header>
          {billingAddresses.map((address) => (
            <AddressComponent
              country={address.country}
              city={address.city}
              postalCode={address.postalCode}
              streetName={address.streetName}
              key={address.id}
              id={address.id}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Profile;
