"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ALGORITHM = process.env.ALGORITHM;
const KEY = Buffer.from(process.env.KEY, "hex");
const IV = process.env.IV;
function encrypt(text) {
    let cipher = crypto_1.default.createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: IV, encryptedData: encrypted.toString('hex') };
}
exports.encrypt = encrypt;
function decrypt(encryptedData) {
    const KEY = Buffer.from(process.env.KEY, "hex");
    const IV = Buffer.from(encryptedData.iv, 'hex');
    const encryptedText = Buffer.from(encryptedData.encryptedData, 'hex');
    let decipher = crypto_1.default.createDecipheriv(ALGORITHM, KEY, IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
function hashEmail(email) {
    return crypto_1.default.createHash('sha256').update(email).digest('hex');
}
// export function encrypt(text: string): Buffer {
//     const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return Buffer.concat([iv, encrypted]); // Prepend IV for use in decryption
// }
// export function decrypt(encrypted: Buffer): string {
//     const iv = encrypted.slice(0, 16);
//     const content = encrypted.slice(16);
//     const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
//     let decrypted = decipher.update(content);
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
// }
