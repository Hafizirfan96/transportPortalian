import { MobileWorkloadGroupModel } from '../responseModels/workloadModel';
import { ApiState } from '../shared/apiState';

export interface WorkloadState extends ApiState {
  // shiftStart: MobileWorkloadGroupModel | null;
  // shiftEnd: boolean;
  status: string;
  // myStartedShifts: MobileWorkloadGroupModel | null;
  workloadData: any | object | null;
  defaultWorlLoadData: any | object | null;
  isLoading: boolean;
  selectedItems: string[];
  selectedItemsIndexs: number[];
  hasSelectedItems: boolean;
  hasNewItems: boolean;
  workLoadList: string[];
  filter: WorkloadFilter;
}

export interface WorkloadFilter {
  Type: number[];
  Status: string[];
  Sort: number;
  Term: string;
}
export interface WorkloadResult {
  filter: WorkloadFilter;
  result: any[];
}
