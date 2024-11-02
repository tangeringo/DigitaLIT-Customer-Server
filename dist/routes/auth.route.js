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
const crypto_utils_1 = require("../utils/crypto.utils");
const postgresql_db_config_1 = __importDefault(require("../postgresql.db.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json("Incorrect form submission");
    try {
        const hashedEmail = (0, crypto_utils_1.hashEmail)(email);
        const users = yield (0, postgresql_db_config_1.default)('auth')
            .select('id', 'hashedPassword')
            .where('hashedEmail', hashedEmail);
        if (users.length > 0) {
            const userData = users[0];
            const storedPasswordHash = userData.hashedPassword;
            if (bcrypt_1.default.compareSync(password, storedPasswordHash)) {
                const tokens = (0, generate_utils_1.generateTokens)(userData.id);
                return res.status(200).json({ tokens });
            }
            else
                return res.status(400).json('Wrong credentials');
        }
        else
            return res.status(400).json("Wrong credentials, can't log in.");
    }
    catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: `Handling login data failed` });
    }
}));
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password)
        return res.status(400).json("Incorrect form submission");
    const createdAt = new Date();
    try {
        const encryptedEmail = (0, crypto_utils_1.encrypt)(email).toString('hex'); // Store as hex string
        const encryptedDisplayName = (0, crypto_utils_1.encrypt)(displayName).toString('hex');
        const hashedEmail = (0, crypto_utils_1.hashEmail)(email);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); // 10 -> salt
        const result = yield (0, postgresql_db_config_1.default)('auth')
            .insert({
            createdAt,
            displayName: encryptedDisplayName,
            encryptedEmail,
            hashedEmail,
            hashedPassword,
        })
            .returning(['id']); // PostgreSQL-specific: returns the inserted ID
        const userId = result[0].id;
        const tokens = (0, generate_utils_1.generateTokens)(userId); // Use email here to tie tokens to user
        return res.status(200).json({ tokens });
    }
    catch (error) {
        return res.status(500).json({ error: 'Handling register data failed' });
    }
}));
exports.default = authRouter;
