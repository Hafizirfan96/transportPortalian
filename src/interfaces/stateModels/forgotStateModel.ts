import { ApiState } from '../shared/apiState';

export interface forgotState extends ApiState {
  status: string;
  isLoading: boolean;
  value: boolean;
  isError: boolean;
}
