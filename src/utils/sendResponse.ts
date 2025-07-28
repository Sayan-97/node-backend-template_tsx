import type { Response } from 'express';

const sendResponse = <T>(
  res: Response<ApiResponse<T>>,
  statusCode: number,
  payload: ApiResponse<T>,
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json(payload);
};

export default sendResponse;
