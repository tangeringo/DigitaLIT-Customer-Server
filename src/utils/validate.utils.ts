import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateToken } from './generate.utils';

dotenv.config();
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY as string;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export function validateTokenId(token: string, secret_key: string): string | null {
    try {
        const decoded = jwt.verify(token, secret_key) as JwtPayload;
        return decoded.userId;
    } catch { return null; }
}

export const isAccessTokenValid = (accessToken: string): boolean => {
    if (!accessToken) throw new Error("Access token not provided");
    const tokenId = validateTokenId(accessToken, JWT_ACCESS_SECRET);
    return !!tokenId;  // true if string, false if null
};

export const getNewAccessToken = (refreshToken: string): string | undefined => {
    if (!refreshToken) throw new Error("Refresh token not provided");

    const tokenId = validateTokenId(refreshToken, JWT_REFRESH_SECRET);
    if (!tokenId) throw new Error("Refresh token expired");
    try { 
        return generateToken(tokenId, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRY);
    } catch (err) { 
        throw new Error(`Internal server error ${err}`); 
    }
};


export const validateAuthCredentials = (accessToken: string, refreshToken: string): string | undefined => {
    const isValid = isAccessTokenValid(accessToken);
    if (isValid) return undefined;
    try {
        return getNewAccessToken(refreshToken);
    } catch(err) { throw new Error(`Runtime error: ${err}`); }
}