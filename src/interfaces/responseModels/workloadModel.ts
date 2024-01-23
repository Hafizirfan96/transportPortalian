export interface MobileWorkloadGroupModel {
  id: number;
  guid: string;
  address: string;
  postCode: string;
  city: string;
  wayBillNumber: string;
  deadline: string;
  status: number;
  type: number;
  tourId: number;
  kTId: number;
  projectId: number;
  name: string;
  phone: string;
  detail: MobileWorkloadDetailModel[];
}

export interface MobileWorkloadDetailModel {
  kolliId: number;
  kolliNumber: string;
}
