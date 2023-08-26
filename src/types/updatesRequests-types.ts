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

export type Actions = (EmailRequest | setFirstName | setLastName | setDateOfBirth)[];
