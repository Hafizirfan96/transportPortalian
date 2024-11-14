import { Config } from '@/Config';
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

export async function exchangeToken(data: any): Promise<any> {
  let url = '/api/auth/token';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function refreshTokens(
  refreshToken: string,
  userId: any,
): Promise<any> {
  let url = '/api/Auth/refresh';
  let payload: any = {
    RefreshToken: refreshToken,
    UserId: userId,
    CompanyGuid: '',
  };
  const response: AxiosResponse<any> = await api.post(url, payload);
  return response.data;
}

export const authService = { exchangeToken, refreshTokens };
