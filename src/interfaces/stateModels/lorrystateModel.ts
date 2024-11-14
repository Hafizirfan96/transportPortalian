import { ApiState } from '../shared/apiState';

export interface lorryState extends ApiState {
  status: string;
  lorryData: any | object | null;
  isLoading: boolean;
  vehicleStartData?: object | null;
  isError: boolean;
  isUpdatingLorry: boolean;
  selectedIndex: number;
}
