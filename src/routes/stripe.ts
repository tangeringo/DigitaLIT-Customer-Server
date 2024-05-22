import { Router, Request, Response } from "express";
import { StripeRequestBody } from "../utils/interfaces";
import axios from "axios";

const stripeRouter = Router();

const host = process.env.HOST;
const stripePort = process.env.STRIPE_PORT;

stripeRouter.post("/secret", async(req: Request, res: Response) => {
    const { amount }: StripeRequestBody = req.body;
    try {
      const response = await axios.post(`${host}${stripePort}/secret`, { amount });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
})


export default stripeRouter;