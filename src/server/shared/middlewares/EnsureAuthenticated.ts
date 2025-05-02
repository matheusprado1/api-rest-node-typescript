import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";





export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;


  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' }
    });
    return;
  }
  console.log(authorization);

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' }
    });
    return;
  }

  if (token !== 'teste.teste.teste') {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: 'Não autenticado' }
    });
    return;
  }

  next();
};
