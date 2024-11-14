import { TourDetailModel } from '../responseModels/tourModel';
import { ApiState } from '../shared/apiState';

export interface TourState extends ApiState {
  status: string;
  tourData: any | null;
  info: object | null;
  currentTourItem: any | null;
  isLoading: boolean;
  tourId: object | null;
  tourEnd: boolean;
  isError: boolean;
  TourValid: boolean;
  isUpdating: boolean;
  activeToursIds: any[];
}
