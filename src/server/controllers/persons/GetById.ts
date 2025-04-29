import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { PersonsProvider } from '../../database/providers/persons';
import { validation } from '../../shared/middlewares';


interface IParamProps {
  id?: number;
};

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response): Promise<void> => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      }
    });
    return;
  }

  const result = await PersonsProvider.getById(req.params.id);
  if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      }
    });
    return;
  }

  res.status(StatusCodes.OK).json(result);
};
