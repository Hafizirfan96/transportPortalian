//Request Models
export type { ProductListRequestModel } from './requestModels/productListRequestModel';
export type {
  StartShiftRequestModel,
  EndShiftRequestModel,
} from './requestModels/shiftRequestModel';
export type { forgotPasswordModel } from './requestModels/forgotPasswordRequestModel';
export type {
  TourStartRequestModel,
  TourEndRequestModel,
} from './requestModels/tourRequestModel';

export type { CreateSignatureModel } from './requestModels/createSignatureRequestModel';
export type {
  VehicleSearchModel,
  VehicleStartModel,
  VehicleLorryModel,
} from './requestModels/vehicleRequestModel';

export type {
  InspectionModel,
  QuestionAnswerDetail,
} from './requestModels/inspectionRequestModel';

export type {
  WorkloadStartModel,
  WorkloadEndModel,
  WorkloadProductListModel,
} from './requestModels/workloadRequestModel';
export type { ProductHistoryRequestModel } from './requestModels/getProductHistoryRequestModal';
export type { createWorkloadRequestModel} from './requestModels/createWorkloadRequestModel'
export  type {serviceModel} from './requestModels/vehicleServiceRequestModel'

//Response Models
export type { DashboardInfoModel } from './responseModels/dasboardInfo';
export type { ShiftStartModel } from './responseModels/shiftStartModel';
export type { TourDetailModel } from './responseModels/tourModel';

export type { MobileWorkloadGroupModel } from './responseModels/workloadModel';
import type { VehicleSearchModel } from './responseModels/vehicleModel';
export type { VehicleInfo, listitem } from './responseModels/vehicleModel';
export type { VehicleData } from './responseModels/vehicleModel';
export type { logoutModel } from './responseModels/logoutModel';

//State Models
export type { DashboardState } from './stateModels/dashboardStateModel';
export type { ShiftState } from './stateModels/shiftStateModel';
export type { TourState } from './stateModels/tourInfoStateModal';
export type { VehicleState } from './stateModels/vehicleStateModel';
export type { lorryState } from './stateModels/lorrystateModel';
export type { WorkloadState } from './stateModels/workloadStateModel';
export type { productState } from './stateModels/productStateModel';
export type { logOutStateModel } from './stateModels/logoutStateModel';
export type { vehicleInspectionQuestion } from './stateModels/vehicleInceptionStateModel';
export type { forgotState } from './stateModels/forgotStateModel';
export type { signatureState } from './stateModels/signatureStateModal';
export type { productHistoryState } from './stateModels/ProductHisoryModel;
export type { newWorkloadState} from './stateModels/newWorkloadStateModel'
export type { createWorkloadState} from './stateModels/newWorkloadStateModel'
export type {vehicleServiceStateModel} from './stateModels/vehicleServiceStateModel'
