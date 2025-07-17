import { Router } from 'express';
import { VerificationController } from '../controllers/verificationControllers';
import { verificationAttemptLimiter, verificationRequestLimiter } from '../middlewares/rateLimiter';

const router = Router();
const verificationController = new VerificationController();

// POST /api/verification/request
router.post('/request', verificationRequestLimiter, (req, res) => {
  verificationController.requestVerification(req, res);
});

// POST /api/verification/verify
router.post('/verify', verificationAttemptLimiter, (req, res) => {
  verificationController.verifyCode(req, res);
});

export default router;