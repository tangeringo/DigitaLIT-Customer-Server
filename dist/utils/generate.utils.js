"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const fs_1 = require("fs");
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const generateSecretKey = (length = 32) => {
    return (0, crypto_1.randomBytes)(length).toString('hex');
};
const generateEncryptionKey = (length = 32) => {
    const encryptionKey = (0, crypto_1.randomBytes)(length).toString('hex');
    const iv = (0, crypto_1.randomBytes)(16).toString('hex');
    (0, fs_1.writeFileSync)('.env.key', `KEY=${encryptionKey}`);
    (0, fs_1.writeFileSync)('.env.iv', `IV=${iv}`);
};
const generateTokens = (email) => {
    const accessToken = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    return { access: accessToken, refresh: refreshToken };
};
exports.generateTokens = generateTokens;
