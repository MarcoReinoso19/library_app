export type ApiResponse<T> = {
  data: T;
  status: number;
};

export interface ApiException {
  message: string
  statusCode: number
  loc?: string[]
}
