import { serviceModel } from '@/interfaces';
import { AxiosResponse } from 'axios';
import api from '@/services/ApiClient';

export async function vehicleService(data: serviceModel): Promise<any> {
  let url = '/api/mobile/service/create';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}
export async function vendorList(): Promise<any> {
  let url = '/api/mobile/service/vendors/list';
  const response: AxiosResponse<any> = await api.get(url);
  return response.data;
}
export const vehicleServices = {
  vehicleService,
  vendorList,
};
