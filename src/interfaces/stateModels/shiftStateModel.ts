import { ShiftStartModel } from '../responseModels/shiftStartModel';
import { ApiState } from '../shared/apiState';

export interface ShiftState extends ApiState {
  shiftStart: ShiftStartModel | null;
  shiftEnd: boolean;
  myStartShiftData: ShiftStartModel | null;
  isLoading: boolean;
}
