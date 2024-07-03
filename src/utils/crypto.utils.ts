import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();


const ALGORITHM = process.env.ALGORITHM as string;
const KEY = Buffer.from(process.env.KEY ?? "" as string, "hex");
const IV = Buffer.from(process.env.IV ?? "" as string, "hex");

export function encrypt(text: string): Buffer {
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return Buffer.from(encrypted, 'hex');
}

export function decrypt(encrypted: Buffer): string {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
}

export function hashEmail(email: string): string {
    return crypto.createHash('sha256').update(email).digest('hex');
}