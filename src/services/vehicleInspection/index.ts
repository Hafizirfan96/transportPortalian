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

export const vehicleInspectionService = {
  getInspectionQuestions,
  createVehicleInspection,
};
