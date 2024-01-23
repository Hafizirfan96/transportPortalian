import { MobileWorkloadGroupModel } from '../responseModels/workloadModel';
import { ApiState } from '../shared/apiState';

export interface WorkloadState extends ApiState {
  // shiftStart: MobileWorkloadGroupModel | null;
  // shiftEnd: boolean;
  status: string;
  // myStartedShifts: MobileWorkloadGroupModel | null;
  workloadData: object | null;
  isLoading: boolean;
  selectedItems: string[];
  hasSelectedItems: boolean;
  workLoadList: string[];
}
