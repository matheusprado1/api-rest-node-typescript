import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


const router = Router();

router.get("/", (__: Request, res: Response) => {
  res.send("Olá, DEV!");
});

router.post("/test", (req: Request, res: Response) => {
  console.log(req.body);

  res.status(StatusCodes.BAD_REQUEST).json(req.body);
});


export { router };
