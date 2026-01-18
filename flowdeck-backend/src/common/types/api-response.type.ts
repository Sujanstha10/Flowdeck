export interface ApiResponse<T = any> {
  status: true;
  data: T;
  statusCode: number;
  message?: string;
  timestamp: string;
  path: string;
}
