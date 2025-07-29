import { Router } from 'express';
import asyncHandler from '@/utils/asyncHandler';
import {
  getTestResponse,
  getErrorResponse,
  getProtectedResponse,
} from '@/controllers/test.controller';
import { checkAuth } from '@/middlewares/checkAuth';

const router: Router = Router();

router.get('/get-test-response', asyncHandler(getTestResponse));
router.get('/get-error-response', asyncHandler(getErrorResponse));
router.get(
  '/get-protected-response',
  checkAuth,
  asyncHandler(getProtectedResponse),
);

export default router;
