import { VehicleSearchModel, VehicleStartModel } from '@/interfaces';
import { AxiosResponse } from 'axios';
import api from '@/services/ApiClient';
import { VehicleEndModel } from '@/interfaces/requestModels/vehicleRequestModel';

let vehicleUrl = '/api/Mobile/Vehicle';

export async function getMyVehicles(data?: VehicleSearchModel): Promise<any> {
  let url = vehicleUrl + '/list';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function startVehicle(data?: VehicleStartModel): Promise<any> {
  let url = vehicleUrl + '/start';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function endVehicle(data?: VehicleEndModel): Promise<any> {
  let url = vehicleUrl + '/end';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function pickupLorry(data?: any): Promise<any> {
  let url = vehicleUrl + '/lorry/update';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const vehicleService = {
  getMyVehicles,
  startVehicle,
  endVehicle,
  pickupLorry,
};
