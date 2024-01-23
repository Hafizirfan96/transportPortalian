import { ApiState } from '../shared/apiState';

export interface vehicleServiceStateModel extends ApiState {
  status: string;
  vehicleServiceData: object | null;
  isLoading: boolean;
  isError: boolean;
  vendorList: any;
}
