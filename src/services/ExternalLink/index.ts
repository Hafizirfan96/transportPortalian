import { AxiosResponse } from 'axios';
import api from '@/services/ApiClient';
import { ExternalLinkModelRoot } from '@/interfaces';

export async function externalLink(data?: ExternalLinkModelRoot): Promise<any> {
  let url = '/api/mobile/externallink/list';
  const response: AxiosResponse<any> = await api.post(url, data);
  return response.data;
}

export const externalLinkService = {
  externalLink,
};
