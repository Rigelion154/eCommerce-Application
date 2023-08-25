import { ICustomer, IToken } from '../../types/types';
import { apiConstants, apiScopes } from './apiConstants';

export default async function logIn(email: string, password: string) {
  const scope = Object.values(apiScopes).join(' ');
  const authUrl = `${apiConstants.authUrl}/oauth/${apiConstants.projectKey}/customers/token`;
  const authHeader = `Basic ${btoa(`${apiConstants.clientId}:${apiConstants.clientSecret}`)}`;
  const authData = `grant_type=password&username=${email}&password=${password}&scope=${scope}`;
  const response = await fetch(authUrl, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: authData,
  });
  const token = await (response.json() as Promise<IToken>);
  localStorage.setItem('accessToken', token.access_token);
  localStorage.setItem('refreshToken', token.refresh_token);
  if (response.ok) {
    const loginUrl = `${apiConstants.apiUrl}/${apiConstants.projectKey}/login`;
    const data = {
      email,
      password,
    };
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const userData = await (res.json() as Promise<ICustomer>);
      localStorage.setItem('userID', userData.customer.id);
      localStorage.setItem('isAuth', 'true');
    }
  }
  if (response.status === 400) {
    return 400;
  }
  return 'ok';
}
