"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const child_process_1 = require("child_process");
// routers
const auth_1 = __importDefault(require("./routes/auth"));
const stripe_1 = __importDefault(require("./routes/stripe"));
const welcomingRouter_1 = __importDefault(require("./routes/welcomingRouter"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", welcomingRouter_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/stripe", stripe_1.default);
// Start Micro-Services
(0, child_process_1.fork)("src/microservices/stripeService.ts");
app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`);
});
// run the server: npm run dev (with nodemon) or npx ts-node src/index.ts (everyFuckingTime)
