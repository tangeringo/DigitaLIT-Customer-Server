"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const welcomingRouter = (0, express_1.Router)();
welcomingRouter.get("/welcome", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.default = welcomingRouter;
