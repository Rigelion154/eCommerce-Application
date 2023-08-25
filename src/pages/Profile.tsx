import React from 'react';
import Container from '../components/layout/container/Container';
import ProfileAttribute from '../components/profile/ProfileAttribute';
import Address from '../components/profile/Address';

function Profile() {
  return (
    <div>
      <Container>
        <header>Your profile</header>
        <ProfileAttribute headerText='E-Mail' />
        <ProfileAttribute headerText='First name' />
        <ProfileAttribute headerText='Last name' />
        <ProfileAttribute headerText='Date of birth' />
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
