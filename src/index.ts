import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { fork } from "child_process";

// routers
import authRouter from "./routes/auth.route";
import stripeRouter from "./routes/stripe.route";
import welcomingRouter from "./routes/welcome.route";


dotenv.config();
// console.log("Environment Variables (users):", process.env);  // Add this line for debugging
const port = process.env.PORT;

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/customer/home", welcomingRouter);
app.use("/customer/auth", authRouter);
app.use("/customer/stripe", stripeRouter);


// Start Micro-Services
// fork("src/microservices/stripeService.ts");

app.listen(port, () => {
  console.log(`Customers Server is listening on port ${port}`);
});