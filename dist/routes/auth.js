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
const generate_utils_1 = require("../utils/generate.utils");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_utils_1 = require("../utils/crypto.utils");
dotenv_1.default.config();
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // (1) validate the user info
        // (2) if correct -> generate tokens
        const tokens = (0, generate_utils_1.generateTokens)(email); // change for the ID -> from the database afterwards
        res.status(200).json({ tokens });
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const createdAt = new Date();
    try {
        const user = {
            createdAt, displayName: name,
            email, password
        };
        const encryptedEmail = (0, crypto_utils_1.encrypt)(email);
        const encryptedDisplayName = (0, crypto_utils_1.encrypt)(name);
        const hashedPassword = (0, crypto_utils_1.hashText)(password);
        const sql = 'INSERT INTO auth (createdAt, displayName, email, hash) VALUES (?, ?, ?, ?)';
        const values = [createdAt, encryptedDisplayName, encryptedEmail, hashedPassword];
        // (await db).query(sql, [values], (err: any, data: UserData) => {
        //   if (err) res.status(400).json(`Error while making a sql query ${err}`);
        //   return res.json(data);
        // })
        console.log('User registered successfully');
        res.status(200).json({ message: 'User registered successfully' });
        // (2) generate tokens
        const tokens = (0, generate_utils_1.generateTokens)(email); // change for the ID -> from the database afterwards
        res.status(200).json({ tokens });
    }
    catch (error) {
        res.status(500).json({ error: `Handling register data failed: ${error}` });
    }
}));
exports.default = authRouter;
