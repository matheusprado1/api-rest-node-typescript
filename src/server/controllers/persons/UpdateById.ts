import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { IPerson } from '../../database/models';
import { PersonsProvider } from '../../database/providers/persons';

interface IParamProps {
  id?: number;
};

interface IBodyProps extends Omit<IPerson, 'id'> { };

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    cityId: yup.number().integer().required().min(1),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const updateById = async (req: Request<IParamProps>, res: Response): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      }
    });
    return;
  }

  const result = await PersonsProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
    return;
  }

  res.status(StatusCodes.NO_CONTENT).json(result);
};
