import { Router } from "express";
import { AuthRequestBody } from "../utils/interfaces";
import { Request, Response } from "express";
import { generateTokens } from '../utils/generate.utils';
import dotenv from 'dotenv';
import db, { insertUser } from '../mysqlDB';

dotenv.config();
const authRouter = Router();

authRouter.post("/login", async(req: Request, res: Response) => {
  const { email, password }: AuthRequestBody = req.body;

  try {
    // (1) validate the user info
    // const query = 'INSERT INTO mytable (name, value) VALUES (?, ?)';
    // db.query(query, [name, value], (err, results) => {

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

  console.log("name: ", name)
  console.log("email: ", email)
  console.log("password: ", password)
  console.log("createdAt: ", createdAt)

  // CREATE TABLE auth (id INT AUTO_INCREMENT PRIMARY KEY, createdAt DATE, displayName BLOB NOT NULL, email BLOB NOT NULL, UNIQUE KEY unique_email (email(255)), hash CHAR(64) NOT NULL, providerId VARCHAR(10) DEFAULT 'manual'); 

  try {
    // (1) create a new user in the DB
    const user = { 
      createdAt, displayName: name, 
      email, password 
    }

    await insertUser(user);
    // (2) generate tokens
    const tokens = generateTokens(email);  // change for the ID -> from the database afterwards
    res.status(200).json({ tokens });
  } catch (error) {
    res.status(500).json({ error: `Handling register data failed: ${error}`});
  }
});


export default authRouter;