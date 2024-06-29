import { Router } from "express";
import { AuthRequestBody } from "../utils/interfaces";
import { Request, Response } from "express";
import { generateTokens } from '../utils/generate.utils';
import { encrypt, hashText } from "../utils/crypto.utils";
import dotenv from 'dotenv';
import pool from '../db.config';
import mysql from 'mysql2';

dotenv.config();
const authRouter = Router();

authRouter.post("/login", async(req: Request, res: Response) => {
  const { email, password }: AuthRequestBody = req.body;

  try {
    // (1) validate the user info
    // (2) if correct -> generate tokens
    const tokens = generateTokens(email);  // change for the ID -> from the database afterwards
    res.status(200).json({ tokens });
  } catch (error) {
    res.status(500).json({ error: `Handling login data failed: ${error}`});
  }
});


authRouter.post("/register", async(req: Request, res: Response) => {
  const { name, email, password }: AuthRequestBody = req.body;
  const createdAt = new Date();

  try {
    const encryptedEmail = encrypt(email);
    const encryptedDisplayName = encrypt(name);
    const hashedPassword = hashText(password);
    const sql = 'INSERT INTO auth (createdAt, displayName, email, hash) VALUES (?, ?, ?, ?)';
    const values = [createdAt, encryptedDisplayName, encryptedEmail, hashedPassword];

    pool.execute(sql, values, (err: mysql.QueryError | null, result: any) => {
      if (err) return res.status(400).json({ error: `Failed to register user ${err.message}` });
      
      res.status(200).json({ message: `User registered successfully ${result}` });

      // const tokens = generateTokens(email);  // change for the ID -> from the database afterwards
      // res.status(200).json({ tokens });
    });
  } catch (error) {
    res.status(500).json({ error: `Handling register data failed: ${error}`});
  }
});


export default authRouter;