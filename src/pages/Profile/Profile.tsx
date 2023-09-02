import React, { useState, useEffect } from 'react';
import Container from '../../components/layout/container/Container';
import EmailAttribute from '../../components/profile/EmailAttribute';
import AddressComponent from '../../components/profile/Address';
import getCustomerById from '../../core/services/getCustomerById';
import FirstNameAttribute from '../../components/profile/FirstNameAttribute';
import LastNameAttribute from '../../components/profile/LastNameAttribute';
import DateOfBirthAttribute from '../../components/profile/DateOfBirthAttribute';
import { AddressWithID } from '../../types/types';
import NewAddress from '../../components/profile/NewAddress';

function Profile() {
  const userID = localStorage.getItem('userID');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [userVersion, setUserVersion] = useState(0);
  const [shippingAddresses] = useState<AddressWithID[]>([]);
  const [billingAddresses] = useState<AddressWithID[]>([]);
  const [addNewAddress, setAddNewAddress] = useState(true);

  useEffect(() => {
    if (userID) {
      getCustomerById(userID)
        .then((res) => {
          setEmail(res.email);
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setdateOfBirth(res.dateOfBirth);
          setUserVersion(res.version);
          res.addresses.forEach((address) => {
            if (res.defaultShippingAddressId && res.defaultShippingAddressId.includes(address.id)) {
              shippingAddresses.unshift(address);
            } else if (res.shippingAddressIds.includes(address.id)) {
              shippingAddresses.push(address);
            }
            if (res.defaultBillingAddressId && res.defaultBillingAddressId.includes(address.id)) {
              billingAddresses.unshift(address);
            } else if (res.billingAddressIds.includes(address.id)) {
              billingAddresses.push(address);
            }
          });
        })
        .catch(() => {});
    }
  }, [billingAddresses, shippingAddresses, userID]);

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
