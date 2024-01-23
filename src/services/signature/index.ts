import { AxiosResponse } from 'axios';
import api from '@/services/ApiClient';
import { CreateSignatureModel } from '@/interfaces';

let signatureUrl = '/api/mobile/signature';

export async function createSignature(
  data: CreateSignatureModel,
): Promise<any> {
  let url = signatureUrl + '/create';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export async function saveSignatureImage(data: any): Promise<any> {
  let url = '/api/file/mobile/upload';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const signatureService = { createSignature, saveSignatureImage };
