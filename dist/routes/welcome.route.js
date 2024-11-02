"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_utils_1 = require("../utils/validate.utils");
const welcomingRouter = (0, express_1.Router)();
welcomingRouter.get("/welcome", (req, res) => {
    res.send("Express + TypeScript Server,");
});
// welcomingRouter.get("/generate", (req: Request, res: Response) => {
//     generateAuthCredentials()
//     res.send(`check .env.auth_credentials file`);
// })
welcomingRouter.post("/greet", (req, res) => {
    const { id, accessToken, refreshToken } = req.body; // if id => facebook / twitter / google
    if (!accessToken || !refreshToken)
        return res.status(400).json("Missing access token or refresh token");
    const isValid = (0, validate_utils_1.isAccessTokenValid)(accessToken);
    if (!isValid) {
        try {
            const newAccesstoken = (0, validate_utils_1.getNewAccessToken)(refreshToken);
            console.log("NEED to refresh access token" + "new access token: ", newAccesstoken);
            res.status(200).json({
                accessToken: newAccesstoken,
                data: "Good to have you back, sir"
            });
        }
        catch (err) {
            return res.status(500).json("err while execution: " + err);
        }
    }
    else {
        console.log("NO NEED to refresh access token");
        res.status(200).json({
            accessToken,
            data: "Good to have you back, sir"
        });
    }
});
// optimalize the function 
exports.default = welcomingRouter;
