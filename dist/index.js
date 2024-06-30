"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import { fork } from "child_process";
// routers
const auth_1 = __importDefault(require("./routes/auth"));
const stripe_1 = __importDefault(require("./routes/stripe"));
const welcomingRouter_1 = __importDefault(require("./routes/welcomingRouter"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users/home/", welcomingRouter_1.default);
app.use("/users/auth", auth_1.default);
app.use("/users/stripe", stripe_1.default);
// Start Micro-Services
// fork("src/microservices/stripeService.ts");
app.listen(port, () => {
    console.log(`[index server] is running`);
});
