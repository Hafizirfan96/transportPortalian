import { InspectionModel } from '@/interfaces';
import { AxiosResponse } from 'axios';
import api from '@/services/ApiClient';

let vehicleUrl = '/api/mobile';

export async function getInspectionQuestions(): Promise<any> {
  let url = vehicleUrl + '/question/list';
  const response: AxiosResponse<any> = await api.get(url);
  return response.data;
}

export async function createVehicleInspection(
  data: InspectionModel,
): Promise<any> {
  let url = vehicleUrl + '/vehicleinspection/create';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function createVehicleDamage(data: {DamageDetail: string, VehicleId: string}): Promise<any> {
  let url = '/api/mobile/vehicle/damage/create';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function getDamageImages(data: any): Promise<any> {
  let url = '/api/mobile/vehicle/damage/list';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function uploadDamageImages(
  data: InspectionModel,
): Promise<any> {
  const url = 'api/file/upload/multiple/mobile';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const vehicleInspectionService = {
  getInspectionQuestions,
  getDamageImages,
  createVehicleInspection,
  createVehicleDamage,
  uploadDamageImages,
};
