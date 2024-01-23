import { SearchModel } from '../shared/searchModel';
export interface VehicleInfo {
  TourVehicleId: number;
  VehicleId: number;
  Name: string;
  LastKm: number;
  LastPosition: string;
  RegistrationNumber: string;
  Capacity: boolean;
  IsThirdparty: boolean;
  IsLorry: boolean;
  IsVehicleActive: boolean;
}
export interface VehicleData {
  CurrentPage: 0;
  TotalPages: 0;
  TotalItems: 0;
  ItemsPerPage: 0;
  Items: VehicleInfo[];
}
export interface VehicleSearchModel extends SearchModel {
  IsLorry: boolean;
}
export interface listitem {
  TourVehicleId: number;
  VehicleId: number;
  Name: string;
  LastKm: number;
  LastPosition: string;
  RegistrationNumber: string;
  Capacity: boolean;
  IsThirdparty: boolean;
  IsLorry: boolean;
  IsVehicleActive: boolean;
}
