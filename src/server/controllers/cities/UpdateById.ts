import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';

interface IParamProps {
  id?: number;
};
interface IBodyProps {
  name: string;
}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params);
  console.log(req.body);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};
