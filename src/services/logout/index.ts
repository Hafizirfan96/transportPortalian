import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';
import { logoutModel } from '@/interfaces';

async function logOut(): Promise<logoutModel> {
  let url = '/api/UserSettings/logout';
  const response: AxiosResponse<logoutModel> = await api.get(url);
  return response.data;
}

export const logOutService = { logOut };
