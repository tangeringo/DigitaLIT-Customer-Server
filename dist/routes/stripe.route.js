"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const validate_utils_1 = require("../utils/validate.utils");
dotenv_1.default.config();
const stripeRouter = (0, express_1.Router)();
const secretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secretKey);
stripeRouter.post("/secret", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, accessToken, refreshToken, amount } = req.body;
    if (!accessToken || !refreshToken)
        return res.status(400).json("Missing access token or refresh token");
    if (!amount)
        return res.status(400).json("No amount provided");
    try {
        const intent = yield stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        });
        if (!id) {
            const newAccessToken = (0, validate_utils_1.validateAuthCredentials)(accessToken, refreshToken);
            res.status(200).json({ accessToken: newAccessToken, clientSecret: intent.client_secret });
        }
        else {
            res.status(200).json({ accessToken: undefined, clientSecret: intent.client_secret });
        }
    }
    catch (error) {
        res.status(501).json(`Internal error while generating secret ${error}`);
    }
}));
exports.default = stripeRouter;
