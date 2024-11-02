"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.generateToken = exports.generateAuthCredentials = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const fs_1 = require("fs");
dotenv_1.default.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const generateAuthCredentials = (encription_length = 32, secret_length = 64) => {
    const jwt_access_secret = (0, crypto_1.randomBytes)(secret_length).toString('hex');
    const jwt_refresh_secret = (0, crypto_1.randomBytes)(secret_length).toString('hex');
    const encryptionKey = (0, crypto_1.randomBytes)(encription_length).toString('hex');
    const iv = (0, crypto_1.randomBytes)(16).toString('hex');
    (0, fs_1.writeFileSync)('.env.auth_credentials', `JWT_ACCESS_SECRET=${jwt_access_secret}\nJWT_REFRESH_SECRET=${jwt_refresh_secret}\nENCRYPTION_KEY=${encryptionKey}\nIV=${iv}`);
};
exports.generateAuthCredentials = generateAuthCredentials;
const generateToken = (userId, secret_key, token_expiry) => {
    return jsonwebtoken_1.default.sign({ userId }, secret_key, { expiresIn: token_expiry });
};
exports.generateToken = generateToken;
const generateTokens = (userId) => {
    const accessToken = (0, exports.generateToken)(userId, JWT_ACCESS_SECRET, ACCESS_TOKEN_EXPIRY);
    const refreshToken = (0, exports.generateToken)(userId, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY);
    return { accessToken: accessToken, refreshToken: refreshToken };
};
exports.generateTokens = generateTokens;
