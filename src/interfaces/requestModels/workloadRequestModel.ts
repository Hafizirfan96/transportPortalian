export interface WorkloadStartModel {
  StartLocation: string;
  WorkloadInfo: WorkloadInfo[];
}

export interface WorkloadInfo {
  WorkloadGuId: string;
  KTId: number;
  KolliIds: number[];
}

export interface WorkloadEndModel {
  workloadEndStatus: boolean;
  endLocation: string;
  workloadSpecificData: WorkloadSpecificData[];
  productData: Extra[];
}
export interface WorkloadProductListModel {
  workloadEndStatus: boolean;
  endLocation: string;
  workloadSpecificData: WorkloadSpecificData[];
  productData: Extra[];
}

export interface Extra {
  productId: number;
  quantity: number;
  comment: string;
}

export interface WorkloadSpecificData {
  kolliTrackingId: number;
  workloadguid: string;
  status: number;
  kolliIds: number[];
}

export interface WorkloadModel extends ShipmentModel {
  id?: number;
  Latitude?: string;
  priority?: string;
  note?: string;
  ProjectId?: number;
  KolliNumber?: string;
  tourId?: string;
  ReadyFrom?: Date;
  Deadline?: Date;
  Status?: number;
  CustomerId?: number;
  StartPosition?: string;
  StartDatetime?: string;
}

export interface ShipmentModel {
  ReceiverName?: string;
  ReceiverPhone?: string;
  Address?: string;
  SenderName?: string;
  SenderAddress?: string;
  SenderPhone?: string;
  Trackingnumber?: string;
  KolliDetail: KolliDetail[];
}

export interface KolliDetail {
  Height: number;
  KolliID: number;
  Length: number;
  Volume: number;
  Weight: number;
  Width: number;
}
