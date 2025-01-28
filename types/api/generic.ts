export type GenericResponse<T> = {
  statusCode: number;
  statusMessage: string;
  message?: string;
  data?: T;
};
