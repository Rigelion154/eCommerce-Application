export interface ICustomerLogIn {
  customer: {
    id: string;
    version: number;
    versionModifiedAt: string;
    lastMessageSequenceNumber: number;
    createdAt: string;
    lastModifiedAt: string;
    lastModifiedBy: {
      isPlatformClient: boolean;
      user: {
        typeId: string;
        id: string;
      };
    };
    createdBy: {
      isPlatformClient: boolean;
      user: {
        typeId: string;
        id: string;
      };
    };
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    dateOfBirth: Date;
    addresses: [
      {
        id: string;
        firstName: string;
        lastName: string;
        streetName: string;
        streetNumber: string;
        postalCode: string;
        city: string;
        country: string;
      },
    ];
    shippingAddressIds: string[];
    billingAddressIds: string[];
    isEmailVerified: boolean;
    key: string;
    stores: string[];
    authenticationMode: string;
  };
}

export interface ICustomerGetInfo {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: Date;
  addresses: [
    {
      id: string;
      firstName: string;
      lastName: string;
      streetName: string;
      streetNumber: string;
      postalCode: string;
      city: string;
      country: string;
    },
  ];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  key: string;
  stores: string[];
  authenticationMode: string;
}
