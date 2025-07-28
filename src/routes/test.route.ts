import { Router } from "express";
import asyncHandler from "@/utils/asyncHandler";
import {
  getTestResponse,
  getErrorResponse,
} from "@/controllers/test.controller";

const router: Router = Router();

router.get("/get-test-response", asyncHandler(getTestResponse));
router.get("/get-error-response", asyncHandler(getErrorResponse));

export default router;
