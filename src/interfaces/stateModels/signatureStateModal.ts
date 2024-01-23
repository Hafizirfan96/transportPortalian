import { ApiState } from '../shared/apiState';

export interface signatureState extends ApiState {
  status: string;
  isLoading: boolean;
  signatureImage: string | null;
  SignatureID: any;
}
