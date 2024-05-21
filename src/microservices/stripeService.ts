import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { StripeRequestBody } from "../utils/interfaces";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.STRIPE_PORT;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/secret', async (req: Request, res: Response) => {
  const { amount }: StripeRequestBody = req.body;

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {enabled: true},
    });

    res.json({ client_secret: intent.client_secret });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Stripe Micro-Service listening on port ${port}`)
});


// source: https://codingpr.com/react-typescript-and-express/