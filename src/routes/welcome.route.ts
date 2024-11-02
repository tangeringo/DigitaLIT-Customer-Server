import { Router, Request, Response } from "express";
import { isAccessTokenValid, getNewAccessToken } from "../utils/validate.utils";

const welcomingRouter = Router();
welcomingRouter.get("/welcome", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server,")
})

// welcomingRouter.get("/generate", (req: Request, res: Response) => {
//     generateAuthCredentials()
//     res.send(`check .env.auth_credentials file`);
// })

welcomingRouter.post("/greet", (req: Request, res: Response) => {
    const { id, accessToken, refreshToken } = req.body; // if id => facebook / twitter / google
    if (!accessToken || !refreshToken) return res.status(400).json("Missing access token or refresh token");

    const isValid = isAccessTokenValid(accessToken);
    if (!isValid) {
        try {
            const newAccesstoken = getNewAccessToken(refreshToken);
            console.log("NEED to refresh access token" + "new access token: ", newAccesstoken);
            res.status(200).json({
                accessToken: newAccesstoken,
                data: "Good to have you back, sir"
            });
        } catch(err) {
            return res.status(500).json("err while execution: " + err);
        }
    } else {
        console.log("NO NEED to refresh access token");
        res.status(200).json({
            accessToken,
            data: "Good to have you back, sir"
        });
    }
})


// optimalize the function 


export default welcomingRouter;