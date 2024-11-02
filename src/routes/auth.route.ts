import { Router } from "express";
import { AuthRequestBody, ResetPasswordRequestBody } from "../types/interfaces";
import { Request, Response } from "express";
import { generateTokens } from '../utils/generate.utils';
import { encrypt, hashEmail } from "../utils/crypto.utils";
import pool from "../postgresql.db.config";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validateAuthCredentials, validTokenId } from "../utils/validate.utils";


dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;

const authRouter = Router();
authRouter.post("/login", async (req: Request, res: Response) => {
    const { email, password }: AuthRequestBody = req.body;  
    if (!email || !password) return res.status(400).json("Incorrect form submission");
  
    try {
        const hashedEmail = hashEmail(email);
        const users = await pool('auth')
            .select('id', 'hashedPassword')
            .where('hashedEmail', hashedEmail);
  
        if (users.length > 0) {
            const userData = users[0];
            const storedPasswordHash = userData.hashedPassword;
    
            if (bcrypt.compareSync(password, storedPasswordHash)) {
                const tokens = generateTokens(userData.id);
                return res.status(200).json({ tokens });
            } else return res.status(400).json('Wrong credentials');
        } else return res.status(400).json("Wrong credentials, can't log in.");
  
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: `Handling login data failed` });
    }
});
  
authRouter.post("/register", async (req: Request, res: Response) => {
    const { displayName, email, password }: AuthRequestBody = req.body;
    if (!displayName || !email || !password)
        return res.status(400).json("Incorrect form submission");

    const createdAt = new Date();
    try {
        const encryptedEmail = encrypt(email).toString('hex'); // Store as hex string
        const encryptedDisplayName = encrypt(displayName).toString('hex');
        const hashedEmail = hashEmail(email);
        const hashedPassword = await bcrypt.hash(password, 10); // 10 -> salt
    
        const result = await pool('auth')
          .insert({
            createdAt,
            displayName: encryptedDisplayName,
            encryptedEmail,
            hashedEmail,
            hashedPassword,
          })
          .returning(['id']); // PostgreSQL-specific: returns the inserted ID
    
        const userId = result[0].id;
        const tokens = generateTokens(userId); // Use email here to tie tokens to user
    
        return res.status(200).json({ tokens });
    } catch (error) { return res.status(500).json({ error: 'Handling register data failed' }); }
});

authRouter.put("/reset-password", async (req: Request, res: Response) => {
    const { accessToken, refreshToken, newPassword }: ResetPasswordRequestBody = req.body;
    if (!accessToken || !refreshToken) return res.status(400).json("Missing access token or refresh token");
    if (!newPassword) return res.status(400).json("No newPassword provided");

    try {
        const tokenId = validTokenId(accessToken, JWT_ACCESS_SECRET);
        const newAccessToken = validateAuthCredentials(accessToken, refreshToken) as string;
        const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 -> salt
        const result = await pool('auth')
        .where({ id: tokenId })
        .update({ hashedPassword });
        if (result)
            return res.status(200).json({ accessToken: newAccessToken, message: "password has been changed" });
        else 
            return res.status(404).json({ accessToken: undefined, message: "User not found" });
    } catch (error) { return res.status(501).json(`Runtime error: ${error}`) }
});

export default authRouter;