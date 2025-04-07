import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';

interface ICity {
  name: string;
};

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<object, object, ICity>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};
