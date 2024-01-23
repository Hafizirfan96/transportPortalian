export interface StartShiftRequestModel {
  StartPosition: string;
  StartDateTime: string;
}

export interface EndShiftRequestModel {
  Id: number;
  EndPosition: string;
  EndDateTime: string;
}
