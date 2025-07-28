import type { Request, Response } from 'express';
import sendResponse from '@/utils/sendResponse';

export async function getTestResponse(
  _req: Request,
  res: Response,
): Promise<Response> {
  return sendResponse(res, 200, {
    success: true,
    message: 'Test works properly!',
  });
}

export async function getErrorResponse(
  _req: Request,
  _res: Response,
): Promise<Response> {
  throw new Error('Test error');
}
