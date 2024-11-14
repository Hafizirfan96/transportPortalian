import api from '@/services/ApiClient';
import { LogLevel } from '@/enums';
import { AxiosResponse } from 'axios';

let workloadUrl = 'api/mobile/logging/log';

interface LogEntry {
  LogLevel: LogLevel;
  Message: string;
}

export async function logInfo(data: LogEntry): Promise<any> {
  const response: AxiosResponse<any> = await api.post(workloadUrl, data);
  return response.data;
}

export const logService = {
  logInfo,
};
