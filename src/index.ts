import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fork } from "child_process";

// routers
import authRouter from "./routes/auth";
import stripeRouter from "./routes/stripe";
import welcomingRouter from "./routes/welcomingRouter";


dotenv.config();
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/api", welcomingRouter);
app.use("/api/auth", authRouter);
app.use("/api/stripe", stripeRouter);


// Start Micro-Services
fork("src/microservices/stripeService.ts");


app.listen(port, () => {
  console.log(`[server]: Server is running at port ${port}`);
});


// run the server: npm run dev (with nodemon) or npx ts-node src/index.ts (everyFuckingTime)