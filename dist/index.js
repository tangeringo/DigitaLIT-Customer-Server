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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const host = process.env.HOST;
const port = process.env.PORT;
const stripePort = process.env.STRIPE_PORT;
const loginPort = process.env.LOGIN_PORT;
// Start Micro-Services
(0, child_process_1.fork)("src/microservices/stripeService.ts");
// initial welcomming
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Stripe Endpoint
app.post("/secret", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    try {
        const response = yield axios_1.default.post(`${host}${stripePort}/secret`, { amount });
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Login Endpoint
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);
    try {
        //   // const response = await axios.post(`${host}${loginPort}/login`, { email, password });
        //   // res.json(response.data);
        res.status(200).json({ tokens: { access: "access23", refresh: "refresh123" } }); // doesn't send anything back
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
// Login Endpoint
app.post("/create-account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("password: ", password);
    try {
        // const response = await axios.post(`${host}${loginPort}/login`, { email, password });
        // res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at ${host}${port}`);
});
// run the server: npm run dev (with nodemon) or npx ts-node src/index.ts (everyFuckingTime)
