import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

import { fork } from "child_process";
import { StripeRequestBody, AuthRequestBody } from "./utils/interfaces";


const app: Express = express();
app.use(express.json());
app.use(cors());


dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;
const stripePort = process.env.STRIPE_PORT;
const loginPort = process.env.LOGIN_PORT;


// Start Micro-Services
fork("src/microservices/stripeService.ts");


// initial welcomming
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


// Stripe Endpoint
app.post("/secret", async(req: Request, res: Response) => {
  const { amount }: StripeRequestBody = req.body;
  try {
    const response = await axios.post(`${host}${stripePort}/secret`, { amount });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Login Endpoint
app.post("/login", async(req: Request, res: Response) => {
  const { email, password }: AuthRequestBody = req.body;
  console.log("email: ", email)
  console.log("password: ", password);
  try {
  //   // const response = await axios.post(`${host}${loginPort}/login`, { email, password });
  //   // res.json(response.data);
    res.status(200).json({ tokens: { access: "access23", refresh: "refresh123" }} );  // doesn't send anything back
  } catch (error) {
    res.status(500).json({ error: `Handling login data failed: ${error}`});
  }
})


// Login Endpoint
app.post("/create-account", async(req: Request, res: Response) => {
  const { name, email, password }: AuthRequestBody = req.body;
  console.log("name: ", name);
  console.log("email: ", email);
  console.log("password: ", password);
  try {
    // const response = await axios.post(`${host}${loginPort}/login`, { email, password });
    // res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Handling login data failed: ${error}`});
  }
})


app.listen(port, () => {
  console.log(`[server]: Server is running at ${host}${port}`);
});


// run the server: npm run dev (with nodemon) or npx ts-node src/index.ts (everyFuckingTime)