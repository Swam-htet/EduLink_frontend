// base generic api type

export type ApiResponse<T> = {
  data: T;
  message: string;
  timeStamp: string;
  meta?: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export interface ActionResponse {
  message: string;
  timestamp: string;
}
