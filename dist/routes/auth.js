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
const generateFuncs_1 = require("../utils/generateFuncs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // (1) validate the user info
        // (2) if correct -> generate tokens
        const tokens = (0, generateFuncs_1.generateTokens)(email); // change for the ID -> from the database afterwards
        res.status(200).json({ tokens });
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        // (1) create a new user in the DB
        // (2) generate tokens
        const tokens = (0, generateFuncs_1.generateTokens)(email); // change for the ID -> from the database afterwards
        res.status(200).json({ tokens });
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
exports.default = authRouter;
