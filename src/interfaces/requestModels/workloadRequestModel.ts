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
