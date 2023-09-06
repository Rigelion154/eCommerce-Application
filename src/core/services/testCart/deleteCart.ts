import axios from 'axios';
import { apiConstants } from '../../constants/apiConstants';

export default async function deleteCart(id: string, vers: number) {
  const token = localStorage.getItem('delete');
  const url = `${apiConstants.apiUrl}/${apiConstants.projectKey}/carts/${id}?version=${vers}`;

  const response = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
  // console.log(response);
}
