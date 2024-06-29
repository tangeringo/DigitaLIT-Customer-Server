import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as https from 'https';
import * as fs from 'fs';
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

// HTTPS options (replace with your actual certificate paths)
// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/diglit.online/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/diglit.online/fullchain.pem'),
// };

app.use("/users/home/", welcomingRouter);
app.use("/users/auth", authRouter);
app.use("/users/stripe", stripeRouter);


// Start Micro-Services
// fork("src/microservices/stripeService.ts");

// Create HTTPS server
// https.createServer(options, app).listen(port, () => {
//   console.log(`HTTPS server running on port ${port}`);
// });

app.listen(port, () => {
  console.log(`[index server] is running`);
});