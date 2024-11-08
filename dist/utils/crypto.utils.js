"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashEmail = exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ALGORITHM = process.env.ALGORITHM;
const KEY = Buffer.from((_a = process.env.KEY) !== null && _a !== void 0 ? _a : "", "hex");
const IV = Buffer.from((_b = process.env.IV) !== null && _b !== void 0 ? _b : "", "hex");
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return Buffer.from(encrypted, 'hex');
}
exports.encrypt = encrypt;
function decrypt(encrypted) {
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, KEY, IV);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}
exports.decrypt = decrypt;
function hashEmail(email) {
    return crypto_1.default.createHash('sha256').update(email).digest('hex');
}
exports.hashEmail = hashEmail;
