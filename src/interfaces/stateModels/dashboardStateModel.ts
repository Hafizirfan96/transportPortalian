import { DashboardInfoModel } from '../responseModels/dasboardInfo';
import { ApiState } from '../shared/apiState';

export interface DashboardState extends ApiState {
  scheduleInfo: DashboardInfoModel | null;
}
