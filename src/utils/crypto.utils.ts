import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Should be stored securely
const iv = crypto.randomBytes(16);

export function encrypt(text: string): Buffer {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return Buffer.concat([iv, encrypted]); // Prepend IV for use in decryption
}

export function decrypt(encrypted: Buffer): string {
    const iv = encrypted.slice(0, 16);
    const content = encrypted.slice(16);
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(content);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}