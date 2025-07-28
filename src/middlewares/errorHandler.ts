import type { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction
) {
  let statusCode = res.statusCode >= 400 ? res.statusCode : 500;
  let message = "Something went wrong";
  let errorDetail: string | undefined;

  if (err instanceof Error) {
    message = err.message;
    errorDetail = err.stack;
  }

  const response: ApiResponse = {
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "production" ? undefined : errorDetail,
  };

  res.status(statusCode).json(response);
}
