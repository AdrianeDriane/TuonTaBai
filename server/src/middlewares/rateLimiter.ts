import rateLimit from 'express-rate-limit';

// Rate limiter for verification requests
export const verificationRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message: 'Too many verification requests, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for verification attempts
export const verificationAttemptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 attempts per windowMs
  message: {
    success: false,
    message: 'Too many verification attempts, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});