import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from '@/utils/asyncHandler';
import env from '@/configs/env';

type AuthRequest = Request & { userId?: string };

export const checkAuth = asyncHandler(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401);
      throw new Error('User not authenticated');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
      id: string;
    };

    if (!decoded) {
      res.status(403);
      throw new Error('Invalid or expired token');
    }

    req.userId = decoded.id;

    next();
  },
);
