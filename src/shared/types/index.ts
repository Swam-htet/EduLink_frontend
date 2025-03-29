// base generic api type

export type ApiResponse<T> = {
  data: T;
  message: string;
  timeStamp: string;
};
