import React from 'react';

export interface IChildren {
  children: React.ReactNode;
}

export interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface INavLink {
  id: number;
  name: string;
  path: string;
  icon: React.ReactElement;
  callback?: () => void;
}

export interface ClientData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress: number | undefined;
  defaultBillingAddress: number | undefined;
}

export type CountryCodes = {
  [countryName: string]: string;
};

export interface IToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
