import { Router } from "express";
import { AuthRequestBody } from "../utils/interfaces";
import { Request, Response } from "express";
import { generateTokens } from '../utils/generate.utils';
import { encrypt, hashEmail } from "../utils/crypto.utils";
import dotenv from 'dotenv';
import pool from '../db.config';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

dotenv.config();
const authRouter = Router();

authRouter.post("/login", async(req: Request, res: Response) => {
  const { email, password }: AuthRequestBody = req.body;

  if (!email || !password) return res.status(400).json("Incorrect form submission");

  const hashedEmail = hashEmail(email);
  const sql = 'SELECT id FROM users WHERE emailHash = ?'
  const values = hashedEmail

  try {
    pool.execute(sql, values, (err: mysql.QueryError | null, results: any) => {
      if (err) return res.status(400).json('Error while logging in');
        const rows = results as any[];

        if (rows.length > 0) {
          const userData = rows[0];
          const storedPasswordHash = userData.hashedPassword;

          if (bcrypt.compareSync(password, storedPasswordHash)) {
            const tokens = generateTokens(userData.id);
            return res.status(200).json({ tokens });

          } else return res.status(400).json('Wrong credentials');
        } else return res.status(400).json('Wrong credentials, can\'t log in.');
    });
    
  } catch (error) {
    return res.status(500).json({ error: `Handling login data failed: ${error}`});
  }
});


authRouter.post("/register", async(req: Request, res: Response) => {
  const { name, email, password }: AuthRequestBody = req.body;
  if (!name || !email || !password) return res.status(400).json("Incorrect form submission");

  const createdAt = new Date();

  try {
    const encryptedEmail = encrypt(email);
    const encryptedDisplayName = encrypt(name);
    const hashedEmail = hashEmail(email);
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 -> salt
    const sql= 'INSERT INTO users (createdAt, displayName, encryptedEmail, hashedEmail, hashedPassword) VALUES (?, ?, ?, ?, ?)';
    const values = [createdAt, encryptedDisplayName, encryptedEmail, hashedEmail, hashedPassword];

    pool.execute(sql, values, (err: mysql.QueryError | null, result: any) => {
      if (err) return res.status(400).json({ error: `Failed to register user` });
      const tokens = generateTokens(result.insertedId);
      return res.status(200).json({ tokens });
    });
    
  } catch (error) {
    return res.status(500).json({ error: `Handling register data failed: ${error}`});
  }
});


export default authRouter;