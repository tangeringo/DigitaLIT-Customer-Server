import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fork } from "child_process";

// routers
import authRouter from "./routes/auth";
import stripeRouter from "./routes/stripe";


dotenv.config();
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/users/auth", authRouter);
app.use("/users/stripe", stripeRouter);


// Start Micro-Services
// fork("src/microservices/stripeService.ts");


app.listen(port, () => {
  console.log(`[index server] is running`);
});