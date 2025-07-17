import api from '../api/api';

export interface RequestVerificationResponse {
  success: boolean;
  message: string;
  token: string;
  expiresIn: number;
}

export interface VerifyCodeResponse {
  success: boolean;
  message: string;
  email?: string;
  token?: string;
  remainingAttempts?: number;
}

export class VerificationService {
  static async requestVerification(email: string): Promise<RequestVerificationResponse> {
    try {
      const response = await api.post('/verification/request', { email });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || error.message || 'Failed to request verification');
      }

      throw new Error('Failed to request verification');
    }
  }

  static async verifyCode(jwt: string, code: string): Promise<VerifyCodeResponse> {
    try {
      const response = await api.post('/verification/verify', { jwt, code });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || error.message || 'Failed to verify code');
      }

      throw new Error('Failed to verify code');
    }
  }
}