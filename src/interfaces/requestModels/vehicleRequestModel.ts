export interface VehicleSearchModel {
  CurrentPage: number;
  PageSize: number;
  SearchTerm: string;
  SortOrder: string;
  SortBy: string;
  IsLorry: boolean;
}

export interface VehicleStartModel {
  VehicleId: number;
  StartKm: number;
  StartPosition: string;
  TourGuids?: string[];
}
export interface VehicleLorryModel {
  CurrentPage: number;
  PageSize: number;
  SearchTerm: string;
  SortOrder: string;
  SortBy: string;
  IsLorry: boolean;
}

export interface VehicleEndModel {
  VehicleId?: number;
  TourVehicleId: number;
  EndKm: any;
  EndPosition: string;
}
