import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import { AuthTokens } from './interfaces';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as string;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY as string;

// generating a secure secret key (e.g. JWT)
const generateSecretKey = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};

export const generateTokens = (email: string): AuthTokens => {
  const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  return { access: accessToken, refresh: refreshToken };
};