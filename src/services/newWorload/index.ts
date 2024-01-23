import {
  newWorkloadState,
  createWorkloadState,
  createWorkloadRequestModel,
} from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

export async function newWorkload(
  searchString: string,
): Promise<newWorkloadState> {
  let url = '/api/location/search/' + searchString;
  const response: AxiosResponse<newWorkloadState> = await api.get(url);
  return response.data;
}
export async function createNewWorkload(
  data: createWorkloadRequestModel,
): Promise<createWorkloadState> {
  let url = '/api/Workload/create';
  const response: AxiosResponse<createWorkloadState> = await api.post(
    url,
    data,
  );
  return response.data;
}
export const newWorkloadService = {
  newWorkload,
  createNewWorkload,
};