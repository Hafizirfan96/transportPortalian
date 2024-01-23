import { AxiosResponse } from 'axios';
import api from '@/services/ApiClient';
import { CreateSignatureModel } from '@/interfaces';

let signatureUrl = '/api/File/upload';

export async function fileUpload(data: CreateSignatureModel): Promise<any> {
  let url = signatureUrl;
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const fileUploadService = { fileUpload };
