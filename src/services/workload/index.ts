import {
  MobileWorkloadGroupModel,
  WorkloadEndModel,
  WorkloadStartModel,
  WorkloadProductListModel,
} from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

let workloadUrl = '/api/Mobile/Workload';

export async function myWorkloads(): Promise<MobileWorkloadGroupModel> {
  let url = workloadUrl + '/list';
  const response: AxiosResponse<MobileWorkloadGroupModel> = await api.get(url);
  return response.data;
}
export async function startWorkload(data?: WorkloadStartModel): Promise<any> {
  let url = workloadUrl + '/start';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function endWorkload(
  data?: WorkloadProductListModel,
): Promise<any> {
  let url = workloadUrl + '/end';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}
export async function productLists(
  data?: WorkloadProductListModel,
): Promise<any> {
  let url = workloadUrl + '/ProductList';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}
export async function deleteWorkload(
  Id?: WorkloadProductListModel,
): Promise<any> {
  let url = '/api/Workload/multiple/delete';
  const response: AxiosResponse<any> = await api.put(url, Id);
  return response.data;
}
export const workloadService = {
  myWorkloads,
  startWorkload,
  endWorkload,
  productLists,
  deleteWorkload,
};
