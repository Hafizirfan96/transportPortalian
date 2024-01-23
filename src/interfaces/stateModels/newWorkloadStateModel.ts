import { ApiState } from '../shared/apiState';

export interface newWorkloadState extends ApiState {
  status: string;
  isLoading: boolean;
  newWorkloadyData?: [] | null;
  createWorkloadyData?: object | null;
}
export interface createWorkloadState extends ApiState {
  status: string;
  isLoading: boolean;
  createWorkloadyData?: object | null;
}
