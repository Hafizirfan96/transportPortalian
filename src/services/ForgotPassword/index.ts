import { forgotPasswordModel } from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

let passwordUrl = '/api/User/register/forgetpassword';

export async function forgotPassword(data: forgotPasswordModel): Promise<any> {
  let url = passwordUrl;
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const forgotPasswordService = { forgotPassword };
