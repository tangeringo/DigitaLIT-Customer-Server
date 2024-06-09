import { Router, Request, Response } from "express";
import { StripeRequestBody } from "../utils/interfaces";
import dotenv from 'dotenv';

dotenv.config();

const stripeRouter = Router();
const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secretKey);

if (!secretKey) {
  throw new Error('Missing secret key');
}

stripeRouter.post("/secret", async (req: Request, res: Response) => {
  const { amount }: StripeRequestBody = req.body;

  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {enabled: true},
    });
    res.status(200).json({ client_secret: intent.client_secret });
  } catch (error) {
    res.status(501).json(`Internal error while generating secret`);
  }
});


export default stripeRouter;