import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';
import { DashboardInfoModel } from '@/interfaces';

async function fetchUserSchedule(): Promise<DashboardInfoModel> {
  let url = '/api/mobile/dashboard/info';
  const response: AxiosResponse<DashboardInfoModel> = await api.get(url);
  return response.data;
}

export const dashboardService = { fetchUserSchedule };
