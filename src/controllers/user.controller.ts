import type { Request, Response } from 'express';
import { User } from '@/models/user.model';
import sendResponse from '@/utils/sendResponse';

type AuthRequest = Request & { userId?: string };

export async function getCurrentUser(
  req: AuthRequest,
  res: Response,
): Promise<Response> {
  const user = await User.findById(req.userId).select('-password');

  if (!user) {
    return sendResponse(res, 404, {
      success: false,
      error: 'User not found',
    });
  }

  return sendResponse(res, 200, {
    success: true,
    data: user,
  });
}

export async function updateCurrentUser(
  req: AuthRequest,
  res: Response,
): Promise<Response> {
  const { username, email } = req.body;

  const user = await User.findById(req.userId).select('-password');
  if (!user) {
    return sendResponse(res, 404, {
      success: false,
      error: 'User not found',
    });
  }

  if (username) user.username = username;
  if (email) user.email = email;

  await user.save();

  return sendResponse(res, 200, {
    success: true,
    data: user,
  });
}

export async function deleteCurrentUser(
  req: AuthRequest,
  res: Response,
): Promise<Response> {
  const user = await User.findById(req.userId);
  if (!user) {
    return sendResponse(res, 404, {
      success: false,
      error: 'User not found',
    });
  }

  await user.deleteOne();

  return sendResponse(res, 200, {
    success: true,
    message: 'User deleted successfully',
  });
}
