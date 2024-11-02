"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthCredentials = exports.getNewAccessToken = exports.isAccessTokenValid = exports.validTokenId = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate_utils_1 = require("./generate.utils");
dotenv_1.default.config();
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
function validTokenId(token, secret_key) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret_key);
        return decoded.userId;
    }
    catch (_a) {
        return null;
    }
}
exports.validTokenId = validTokenId;
const isAccessTokenValid = (accessToken) => {
    if (!accessToken)
        throw new Error("Access token not provided");
    const tokenId = validTokenId(accessToken, JWT_ACCESS_SECRET);
    return !!tokenId; // true if string, false if null
};
exports.isAccessTokenValid = isAccessTokenValid;
const getNewAccessToken = (refreshToken) => {
    if (!refreshToken)
        throw new Error("Refresh token not provided");
    const tokenId = validTokenId(refreshToken, JWT_REFRESH_SECRET);
    if (!tokenId)
        throw new Error("Refresh token expired");
    try {
        return (0, generate_utils_1.generateToken)(tokenId, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRY);
    }
    catch (err) {
        throw new Error(`Internal server error ${err}`);
    }
};
exports.getNewAccessToken = getNewAccessToken;
const validateAuthCredentials = (accessToken, refreshToken) => {
    const isValid = (0, exports.isAccessTokenValid)(accessToken);
    if (isValid)
        return undefined;
    try {
        return (0, exports.getNewAccessToken)(refreshToken);
    }
    catch (err) {
        throw new Error(`Runtime error: ${err}`);
    }
};
exports.validateAuthCredentials = validateAuthCredentials;
