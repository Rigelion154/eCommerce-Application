import { apiConstants } from '../constants/apiConstants';

export default async function updateUserByID(
  id: string | null,
  version: number | null,
  currentPassword: string,
  newPassword: string,
) {
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/customers/password`;
  const token = localStorage.getItem('accessToken');
  const bodyRequest = {
    id,
    version,
    currentPassword,
    newPassword,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyRequest),
  });
  return res;
}
