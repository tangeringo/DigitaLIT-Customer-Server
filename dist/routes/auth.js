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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);
    try {
        res.status(200).json({ tokens: { access: "access23", refresh: "refresh123" } });
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("password: ", password);
    try {
        res.status(200).json({ tokens: { access: "access23", refresh: "refresh123" } });
    }
    catch (error) {
        res.status(500).json({ error: `Handling login data failed: ${error}` });
    }
}));
exports.default = authRouter;
