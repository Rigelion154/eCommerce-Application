import { ICustomerGetInfo } from '../../types/customers-types';
import { apiConstants } from './apiConstants';

export default async function getCustomerById(id: string) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/customers/${id}`;
  const token = localStorage.getItem('accessToken');
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = await (res.json() as Promise<ICustomerGetInfo>);
  return userData;
}
