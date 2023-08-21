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

export interface ClientData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  addresses: Address[];
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
