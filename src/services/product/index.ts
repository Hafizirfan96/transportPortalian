import { DashboardInfoModel, ProductListRequestModel } from '@/interfaces';
import api from '@/services/ApiClient';
import { AxiosResponse } from 'axios';

export async function getMyProducts(
  data: ProductListRequestModel,
): Promise<DashboardInfoModel> {
  let url = '/api/Mobile/Product/lists';
  const response: AxiosResponse<DashboardInfoModel> = await api.post(url, data);
  return response.data;
}

export async function getAllProducts(
  data: ProductListRequestModel,
): Promise<DashboardInfoModel> {
  let url = '/api/Mobile/Product/list';
  const response: AxiosResponse<DashboardInfoModel> = await api.post(url, data);
  return response.data;
}
export async function getProductsForWorkload(projectIds: string): Promise<any> {
  let url = '/api/mobile/product/list/' + projectIds;
  const response: AxiosResponse<any> = await api.get(url);
  return response.data;
}
export const productService = {
  getMyProducts,
  getProductsForWorkload,
  getAllProducts,
};
