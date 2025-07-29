import { Router } from 'express';
import asyncHandler from '@/utils/asyncHandler';
import {
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} from '@/controllers/user.controller';
import { checkAuth } from '@/middlewares/checkAuth';

const router: Router = Router();

router.get('/get-current-user', checkAuth, asyncHandler(getCurrentUser));
router.post('/update-current-user', checkAuth, asyncHandler(updateCurrentUser));
router.delete(
  '/delete-current-user',
  checkAuth,
  asyncHandler(deleteCurrentUser),
);

export default router;
