"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashText = exports.decrypt = exports.encrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const key = crypto_1.default.randomBytes(32); // Should be stored securely
const iv = crypto_1.default.randomBytes(16);
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return Buffer.concat([iv, encrypted]); // Prepend IV for use in decryption
}
exports.encrypt = encrypt;
function decrypt(encrypted) {
    const iv = encrypted.slice(0, 16);
    const content = encrypted.slice(16);
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(content);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
exports.decrypt = decrypt;
function hashText(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    });
}
exports.hashText = hashText;
