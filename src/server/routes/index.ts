import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "./../controllers";


const router = Router();




router.get("/", (_, res) => {
  res.send("Olá, DEV!");
});

router.post("/cities", CitiesController.createBodyValidator, CitiesController.create);


export { router };
