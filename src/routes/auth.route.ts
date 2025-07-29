import { Router } from 'express';
import asyncHandler from '@/utils/asyncHandler';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '@/controllers/auth.controller';

const router: Router = Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.post('/logout', asyncHandler(logoutUser));

export default router;
