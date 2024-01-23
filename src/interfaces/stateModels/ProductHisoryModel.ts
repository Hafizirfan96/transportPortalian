import { ApiState } from '../shared/apiState';

export interface productHistoryState extends ApiState {
  status: string;
  isLoading: boolean;
  poductHistoryData?: [] | null;
}
