import React, { useState } from 'react';
import Container from '../components/layout/container/Container';
import EmailAttribute from '../components/profile/EmailAttribute';
import Address from '../components/profile/Address';
import getCustomerById from '../core/services/getCustomerById';
import FirstNameAttribute from '../components/profile/FirstNameAttribute';
import LastNameAttribute from '../components/profile/LastNameAttribute';
import DateOfBirthAttribute from '../components/profile/DateOfBirthAttribute';

function Profile() {
  const isAuth = localStorage.getItem('isAuth');
  const userID = localStorage.getItem('userID');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [userVersion, setUserVersion] = useState(0);
  if (isAuth === 'true' && userID) {
    getCustomerById(userID).then(
      (result) => {
        setEmail(result.email);
        setFirstName(result.firstName);
        setLastName(result.lastName);
        setdateOfBirth(result.dateOfBirth);
        setUserVersion(result.version);
      },
      () => new Error(`Couldn't receive user information!`),
    );
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
          <header>Shipping addresses</header>
          <Address />
        </div>
        <div>
          <header>Billing addresses</header>
          <Address />
        </div>
      </Container>
    </div>
  );
}

export default Profile;
