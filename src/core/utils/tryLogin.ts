import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import logIn from '../../components/login/LogInFunction';

export default async function tryLogIn(
  email: string,
  password: string,
  showError: Dispatch<SetStateAction<string | boolean>>,
  navigate: NavigateFunction,
) {
  const response = await logIn(email, password);
  if (response === 400) {
    showError(false);
  }
  if (response === 'ok') {
    navigate('/');
  }
  return response;
}
