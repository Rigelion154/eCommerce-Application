import axios from 'axios';
import { apiConstants } from '../../constants/apiConstants';

export default async function deleteCart(id: string, version: number) {
  const token = localStorage.getItem('accessToken');
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/me/carts/${id}?version=${version}`;

  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
