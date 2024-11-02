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
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const stripe_route_1 = __importDefault(require("./routes/stripe.route"));
const welcome_route_1 = __importDefault(require("./routes/welcome.route"));
dotenv_1.default.config();
// console.log("Environment Variables (users):", process.env);  // Add this line for debugging
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/customer/home", welcome_route_1.default);
app.use("/customer/auth", auth_route_1.default);
app.use("/customer/stripe", stripe_route_1.default);
// Start Micro-Services
// fork("src/microservices/stripeService.ts");
app.listen(port, () => {
    console.log(`Customers Server is listening on port ${port}`);
});
