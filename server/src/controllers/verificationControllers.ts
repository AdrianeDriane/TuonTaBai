import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CryptoUtils } from '../utils/crypto';
import { EmailService } from '../services/emailService';
import { VerificationJWTPayload, RequestVerificationRequest, VerifyCodeRequest } from '../types/verification';
import User from '../models/User';

export class VerificationController {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';
  private static readonly JWT_EXPIRY = '5m'; // 5 minutes
  private static readonly MAX_ATTEMPTS = 5;
  
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Request email verification endpoint
   */
  async requestVerification(req: Request, res: Response): Promise<void> {
    try {
      const { email }: RequestVerificationRequest = req.body;

      // Validate email format
      if (!email || !this.isValidEmail(email)) {
        res.status(400).json({
          success: false,
          message: 'Valid email address is required',
        });
        return;
      }

      // Generate 6-digit code
      const code = CryptoUtils.generateCode();
      
      // Hash the code
      const codeHash = CryptoUtils.hashCode(code);

      // Create JWT payload
      const payload: VerificationJWTPayload = {
        email,
        codeHash,
        attempts: 0,
        iat: Math.floor(Date.now() / 1000),
      };

      // Sign JWT
      const token = jwt.sign(payload, VerificationController.JWT_SECRET, {
        expiresIn: VerificationController.JWT_EXPIRY,
      });

      // Send email
      const emailSent = await this.emailService.sendVerificationCode(email, code);

      if (!emailSent) {
        res.status(500).json({
          success: false,
          message: 'Failed to send verification email',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Verification code sent successfully',
        token,
        expiresIn: 5 * 60, // 5 minutes in seconds
      });

    } catch (error) {
      console.error('Error in requestVerification:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Verify code endpoint
   */
  async verifyCode(req: Request, res: Response): Promise<void> {
    try {
      const { jwt: token, code }: VerifyCodeRequest = req.body;

      // Validate input
      if (!token || !code) {
        res.status(400).json({
          success: false,
          message: 'JWT token and verification code are required',
        });
        return;
      }

      // Validate code format (6 digits)
      if (!/^\d{6}$/.test(code)) {
        res.status(400).json({
          success: false,
          message: 'Verification code must be 6 digits',
        });
        return;
      }

      let payload: VerificationJWTPayload;

      try {
        // Verify and decode JWT
        payload = jwt.verify(token, VerificationController.JWT_SECRET) as VerificationJWTPayload;
      } catch (jwtError) {
        res.status(401).json({
          success: false,
          message: 'Invalid or expired verification token',
        });
        return;
      }

      // Check if max attempts exceeded
      if (payload.attempts >= VerificationController.MAX_ATTEMPTS) {
        res.status(429).json({
          success: false,
          message: 'Maximum verification attempts exceeded. Please request a new code.',
        });
        return;
      }

      // Increment attempts
      const newAttempts = payload.attempts + 1;

      // Verify the code
      const isCodeValid = CryptoUtils.verifyCode(code, payload.codeHash);

      if (isCodeValid) {
      // ✅ Mark user as verified
      await User.findOneAndUpdate(
        { email: payload.email },
        { $set: { verified: true } },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Email verified successfully',
        email: payload.email,
      });
    } else {
        // Incorrect code - create new JWT with incremented attempts
        const newPayload: VerificationJWTPayload = {
          ...payload,
          attempts: newAttempts,
        };

        const newToken = jwt.sign(newPayload, VerificationController.JWT_SECRET, {
          expiresIn: VerificationController.JWT_EXPIRY,
        });

        const remainingAttempts = VerificationController.MAX_ATTEMPTS - newAttempts;

        res.status(400).json({
          success: false,
          message: `Incorrect verification code. ${remainingAttempts} attempt(s) remaining.`,
          token: newToken,
          remainingAttempts,
        });
      }

    } catch (error) {
      console.error('Error in verifyCode:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}