import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { PersonsProvider } from '../../database/providers/persons';
import { validation } from '../../shared/middlewares';
import { IPerson } from '../../database/models';

interface IBodyProps extends Omit<IPerson, 'id'> { };

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    cityId: yup.number().integer().required().min(1),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
  const result = await PersonsProvider.create(req.body);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
    return;
  }

  res.status(StatusCodes.CREATED).json(result);
};
