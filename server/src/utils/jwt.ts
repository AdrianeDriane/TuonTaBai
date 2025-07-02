import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (payload: { id: string; email: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }); // Short-lived
};

export const generateRefreshToken = (payload: { id: string; email: string }) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" }); // Long-lived
};
