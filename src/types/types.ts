import React from 'react';

export interface IChildren {
  children: React.ReactNode;
}

export interface IToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}
