import { ApiState } from '../shared/apiState';

export interface logOutStateModel extends ApiState {
  status: string;
  isActive: boolean;
}
