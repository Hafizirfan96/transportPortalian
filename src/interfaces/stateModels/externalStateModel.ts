import { ApiState } from '../shared/apiState';

export interface ExternalStateModal extends ApiState {
  status: string;
  externalLinkData: any | null | object;
  isLoading: boolean;
  isError: boolean;
  isUpdating: boolean;
}
