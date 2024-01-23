import { ProductHistoryRequestModel } from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

export async function getProductHistory(
  kTId: number,
): Promise<ProductHistoryRequestModel> {
  let url = '/api/mobile/workload/product/history/' + kTId;
  const response: AxiosResponse<ProductHistoryRequestModel> = await api.get(
    url,
  );
  return response.data;
}
export const productHistoryService = {
  getProductHistory,
};
