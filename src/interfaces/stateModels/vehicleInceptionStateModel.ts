import { ApiState } from '../shared/apiState';

export type vehicleInspectionQuestion = vehicleInspections[];

export interface vehicleInspections extends ApiState {
  GroupName: string;
  Questions: Questions[];
}

export interface Questions {
  Id: number;
  Text: string;
}
