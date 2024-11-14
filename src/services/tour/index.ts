import {
  TourDetailModel,
  TourEndRequestModel,
  TourStartRequestModel,
} from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

let tourUrl = '/api/mobile/tour';

export async function getMyTours(): Promise<TourDetailModel> {
  let url = tourUrl + '/list';
  const response: AxiosResponse<TourDetailModel> = await api.get(url);
  return response.data;
}

export async function startTour(data: TourStartRequestModel): Promise<number> {
  let url = tourUrl + '/start';
  const response: AxiosResponse<number> = await api.post(url, data);
  return response.data;
}

export async function endTour(data: TourEndRequestModel) {
  let url = tourUrl + '/end';
  const response: AxiosResponse<any> = await api.post(url, data);
  // return await api.post(url, data);
  return response.data;
}

export const tourService = { getMyTours, startTour, endTour };
