import express, { Request, Response } from "express";


const server = express();

server.get('/', (_req: Request, res: Response) => {
  return res.send('Olá, DEV'!);
});


export { server };

