import { Router, Request, Response } from "express";
import { StripeRequestBody } from "../types/interfaces";
import dotenv from 'dotenv';
import { validateAuthCredentials } from "../utils/validate.utils";

dotenv.config();

const stripeRouter = Router();
const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secretKey);

stripeRouter.post("/secret", async (req: Request, res: Response) => {

  const { id, accessToken, refreshToken, amount }: StripeRequestBody = req.body;
  if (!accessToken || !refreshToken) return res.status(400).json("Missing access token or refresh token");
  if (!amount) return res.status(400).json("No amount provided");

    try {
      const intent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        automatic_payment_methods: {enabled: true},
      });
  
      if (!id) {
        const newAccessToken = validateAuthCredentials(accessToken, refreshToken) as string;
        res.status(200).json({ accessToken: newAccessToken, clientSecret: intent.client_secret });
      } else 
        res.status(200).json({ accessToken: undefined, clientSecret: intent.client_secret });
    } catch (error) {
      res.status(501).json(`Internal error while generating secret ${error}`);
    }
});


export default stripeRouter;