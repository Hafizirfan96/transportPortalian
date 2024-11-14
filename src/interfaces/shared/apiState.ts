export interface ApiState {
  status: string | 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}
