import { TourDetailModel } from '../responseModels/tourModel';
import { ApiState } from '../shared/apiState';

export interface TourState extends ApiState {
  status: string;
  tourData: object | null;
  info: object | null;
  isLoading: boolean;
  tourId: object | null;
  tourEnd: boolean;
  isError: boolean;
}
