import { ApiState } from '../shared/apiState';

export interface productState extends ApiState {
  status: string;
  productData: any | object | null;
  isLoading: boolean;
  vehicleStartData?: object | null;
  productListsData: object | null;
  allProduct: object | null;
  searchLoading: boolean;
}
