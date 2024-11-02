import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { randomBytes } from "crypto";
import { AuthCredentials } from '../types/interfaces';
import { writeFileSync } from 'fs';

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as string;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY as string;


export const generateAuthCredentials = (encription_length: number = 32, secret_length: number = 64): void => {
  const jwt_access_secret = randomBytes(secret_length).toString('hex');
  const jwt_refresh_secret = randomBytes(secret_length).toString('hex');
  const encryptionKey = randomBytes(encription_length).toString('hex');
  const iv = randomBytes(16).toString('hex');
  writeFileSync('.env.auth_credentials', `JWT_ACCESS_SECRET=${jwt_access_secret}\nJWT_REFRESH_SECRET=${jwt_refresh_secret}\nENCRYPTION_KEY=${encryptionKey}\nIV=${iv}`);
};

export const generateToken = (userId: string, secret_key: string, token_expiry: string): string => {
  return jwt.sign({ userId }, secret_key, { expiresIn: token_expiry });
}

export const generateTokens = (userId: string): AuthCredentials => {
  const accessToken = generateToken(userId, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRY);
  const refreshToken = generateToken(userId, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY);
  return { accessToken: accessToken, refreshToken: refreshToken };
};