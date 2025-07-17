import crypto from 'crypto';

export class CryptoUtils {
  private static readonly SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key';
  
  /**
   * Generate a random 6-digit verification code
   */
  static generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Hash a code using HMAC-SHA256
   */
  static hashCode(code: string): string {
    return crypto
      .createHmac('sha256', this.SECRET_KEY)
      .update(code)
      .digest('hex');
  }

  /**
   * Verify if a code matches the hash
   */
  static verifyCode(code: string, hash: string): boolean {
    const computedHash = this.hashCode(code);
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(computedHash, 'hex')
    );
  }
}