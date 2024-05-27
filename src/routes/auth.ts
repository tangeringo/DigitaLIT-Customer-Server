import { Router } from "express";
import { AuthRequestBody } from "../utils/interfaces";
import { Request, Response } from "express";

const authRouter = Router();

authRouter.post("/login", async(req: Request, res: Response) => {
    const { email, password }: AuthRequestBody = req.body;
    console.log("email: ", email)
    console.log("password: ", password);
    try {
      res.status(200).json({ tokens: { access: "access23", refresh: "refresh123" }} );
    } catch (error) {
      res.status(500).json({ error: `Handling login data failed: ${error}`});
    }
});


authRouter.post("/register", async(req: Request, res: Response) => {
    const { name, email, password }: AuthRequestBody = req.body;
    console.log("name: ", name);
    console.log("email: ", email)
    console.log("password: ", password);
    try {
      res.status(200).json({ tokens: { access: "access23", refresh: "refresh123" }} );
    } catch (error) {
      res.status(500).json({ error: `Handling login data failed: ${error}`});
    }
});


export default authRouter;