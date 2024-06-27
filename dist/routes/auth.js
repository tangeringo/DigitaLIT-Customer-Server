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
const mysqlDB_1 = require("../mysqlDB");
dotenv_1.default.config();
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // (1) validate the user info
        // const query = 'INSERT INTO mytable (name, value) VALUES (?, ?)';
        // db.query(query, [name, value], (err, results) => {
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
    // CREATE TABLE auth (id INT AUTO_INCREMENT PRIMARY KEY, createdAt DATE, displayName BLOB NOT NULL, email BLOB NOT NULL, UNIQUE KEY unique_email (email(255)), hash CHAR(64) NOT NULL, providerId VARCHAR(10) DEFAULT 'manual'); 
    try {
        // (1) create a new user in the DB
        const user = {
            createdAt, displayName: name,
            email, password
        };
        yield (0, mysqlDB_1.insertUser)(user);
        // (2) generate tokens
        const tokens = (0, generate_utils_1.generateTokens)(email); // change for the ID -> from the database afterwards
        res.status(200).json({ tokens });
    }
    catch (error) {
        res.status(500).json({ error: `Handling register data failed: ${error}` });
    }
}));
exports.default = authRouter;
