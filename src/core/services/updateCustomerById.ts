import { Actions } from '../../types/updatesRequests-types';
import { apiConstants } from './apiConstants';

export default async function updateUserByID(
  id: string | null,
  version: number | null,
  actions: Actions,
) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/customers/${id}`;
  const token = localStorage.getItem('accessToken');
  const bodyRequest = {
    version,
    actions,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyRequest),
  });
  return res.json();
}
