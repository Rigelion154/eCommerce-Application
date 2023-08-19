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
