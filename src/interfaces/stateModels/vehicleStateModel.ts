import { VehicleData } from '../responseModels/vehicleModel';
import { ApiState } from '../shared/apiState';

export interface VehicleState extends ApiState {
  status: string;
  vehicleData: object | null;
  isLoading: boolean;
  vehicleStartData?: object | null;
  isError: boolean;
}
