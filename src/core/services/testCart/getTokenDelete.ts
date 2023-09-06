import axios, { AxiosResponse } from 'axios';
import { apiConstants } from '../../constants/apiConstants';
import { IToken } from '../../../types/types';

export default async function getTokenDelete() {
  const scope = 'manage_orders:commerce-shop';
  const authUrl = `${apiConstants.authUrl}/oauth/${apiConstants.projectKey}/anonymous/token`;
  const authHeader = `Basic ${btoa(`i1RFSs2uva20koVlur1Qhwxh:976NjJVnC54kqqDwJmEZApRxgd6avmHE`)}`;
  const authData = `grant_type=client_credentials&scope=${scope}`;

  const response: AxiosResponse<IToken> = await axios.post<IToken>(authUrl, authData, {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { access_token: accessToken, refresh_token: refreshToken } = response.data;
  return { accessToken, refreshToken };
}
