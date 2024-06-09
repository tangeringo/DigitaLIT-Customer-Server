"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
// Generate a secure random key
const generateSecretKey = (length = 32) => {
    return (0, crypto_1.randomBytes)(length).toString('hex');
};
// Example usage
const JWT_SECRET = generateSecretKey();
console.log(JWT_SECRET);
