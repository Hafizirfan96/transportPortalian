import { StartShiftRequestModel } from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

let shiftUrl = '/api/mobile/shift';
async function mineStartedShift(): Promise<any> {
  let url = shiftUrl + '/mine/started';
  const response: AxiosResponse<any> = await api.get(url);
  if (response.status == 204) {
    return null;
  }
  return response.data;
}

async function startShift(data: StartShiftRequestModel): Promise<any> {
  let url = shiftUrl + '/start';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

async function endShift(data: StartShiftRequestModel): Promise<any> {
  let url = shiftUrl + '/end';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const shiftService = { mineStartedShift, startShift, endShift };
