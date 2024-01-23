export interface TourStartRequestModel {
  ProjectId: number;
  ShiftId: number;
  CustomerId: number;
}

export interface TourEndRequestModel {
  tourId: number;
  reference: string;
  //detail: MobileTourDetailModel[];
}
