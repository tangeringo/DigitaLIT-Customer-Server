import { Router, Request, Response } from "express";

const welcomingRouter = Router();

welcomingRouter.get("/welcome", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server,")
})


export default welcomingRouter;