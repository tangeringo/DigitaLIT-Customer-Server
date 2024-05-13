import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

import { fork } from "child_process";
import { RequestBody } from "./utils/interfaces";


const app: Express = express();
app.use(express.json());
app.use(cors());


dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;
const stripePort = process.env.STRIPE_PORT;


// Start Micro-Services
fork("src/microservices/stripeService.ts");


// initial welcomming
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


// Stripe Endpoint
app.post("/secret", async(req: Request, res: Response) => {
  const { amount }: RequestBody = req.body;
  try {
    const response = await axios.post(`${host}${stripePort}/secret`, { amount });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(port, () => {
  console.log(`[server]: Server is running at ${host}${port}`);
});


// run the server: npm run dev (with nodemon) or npx ts-node src/index.ts (everyFuckingTime)