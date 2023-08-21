import { IToken } from '../../types/types';

export default async function logIn(email: string, password: string) {
  const clientId = 'XY9PGkev5sywhdyjMj7HKjZd';
  const clientSecret = 'BnmkgevSHqy-EwuJr6WQdVSp7i_0cB7T';
  const authHost = 'us-central1.gcp.commercetools.com';
  const projectKey = 'commerce-shop';
  const scope = 'manage_my_profile:commerce-shop manage_customers:commerce-shop';
  const authUrl = `https://auth.${authHost}/oauth/${projectKey}/customers/token`;
  const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
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
  if (response.ok) {
    const loginUrl = `https://api.${authHost}/${projectKey}/login`;
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
      localStorage.setItem('isAuth', 'true');
    }
  }
  if (response.status === 400) {
    return 400;
  }
  return 'ok';
}
