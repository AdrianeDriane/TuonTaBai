export interface VerificationJWTPayload {
  email: string;
  codeHash: string;
  attempts: number;
  iat: number;
}

export interface RequestVerificationRequest {
  email: string;
}

export interface VerifyCodeRequest {
  jwt: string;
  code: string;
}