import { Router } from "express";
import { AuthRequestBody } from "../utils/interfaces";
import { Request, Response } from "express";
import { generateTokens } from '../utils/generateFuncs';
import dotenv from 'dotenv';

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

  try {
    // (1) create a new user in the DB

    // (2) generate tokens
    const tokens = generateTokens(email);  // change for the ID -> from the database afterwards
    res.status(200).json({ tokens });
  } catch (error) {
    res.status(500).json({ error: `Handling login data failed: ${error}`});
  }
});


export default authRouter;