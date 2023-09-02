import { Address } from './types';

interface EmailRequest {
  action: 'changeEmail';
  email: string;
}

interface setFirstName {
  action: 'setFirstName';
  firstName: string;
}

interface setLastName {
  action: 'setLastName';
  lastName: string;
}

interface setDateOfBirth {
  action: 'setDateOfBirth';
  dateOfBirth: string;
}

interface updateAddress {
  action: 'changeAddress';
  addressId: string;
  address: Address;
}

interface setDefaultBillingAddress {
  action: 'setDefaultBillingAddress';
  addressId: string;
}

interface setDefaultShippingAddress {
  action: 'setDefaultShippingAddress';
  addressId: string;
}

interface addNewAddress {
  action: 'addAddress';
  address: Address;
}

interface addShippingAddressId {
  action: 'addShippingAddressId';
  addressId: string;
}

interface addBillingAddressId {
  action: 'addBillingAddressId';
  addressId: string;
}

export type Actions = (
  | EmailRequest
  | setFirstName
  | setLastName
  | setDateOfBirth
  | updateAddress
  | setDefaultBillingAddress
  | setDefaultShippingAddress
  | addNewAddress
  | addBillingAddressId
  | addShippingAddressId
)[];
