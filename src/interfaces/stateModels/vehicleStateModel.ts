import { VehicleData } from '../responseModels/vehicleModel';
import { ApiState } from '../shared/apiState';

export interface VehicleState extends ApiState {
  status: string;
  vehicleData: any | null | object;
  isLoading: boolean;
  vehicleStartData?: object | null;
  isError: boolean;
  isUpdating: boolean;
  selectedVehicleId: string;
}
