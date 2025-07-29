import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@/models/user.model';
import sendResponse from '@/utils/sendResponse';
import env from '@/configs/env';
import { loginSchema, registerSchema } from '@/validations/auth.validation';

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
};

export async function registerUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const parsedBody = registerSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return sendResponse(res, 400, {
      success: false,
      error: parsedBody.error.issues[0].message,
    });
  }

  const { username, email, password } = parsedBody.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return sendResponse(res, 400, {
      success: false,
      error: 'User already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, 201, {
    success: true,
    message: 'User registered successfully',
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    },
  });
}

export async function loginUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const parsedBody = loginSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return sendResponse(res, 400, {
      success: false,
      error: parsedBody.error.issues[0].message,
    });
  }

  const { email, password } = parsedBody.data;

  const user = await User.findOne({ email });
  if (!user) {
    return sendResponse(res, 401, {
      success: false,
      error: 'Invalid email or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return sendResponse(res, 401, {
      success: false,
      error: 'Invalid email or password',
    });
  }

  const token = generateToken(user._id.toString());

  res.cookie('token', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return sendResponse(res, 200, {
    success: true,
    message: 'User logged in successfully',
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    },
  });
}

export async function logoutUser(
  _req: Request,
  res: Response,
): Promise<Response> {
  res.clearCookie('token');

  return sendResponse(res, 200, {
    success: true,
    message: 'User logged out successfully',
  });
}
