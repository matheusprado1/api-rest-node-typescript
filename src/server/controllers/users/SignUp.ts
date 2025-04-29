import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';


interface IBodyProps extends Omit<IUser, 'id'> { };

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().required().min(5).email(),
    password: yup.string().required().min(6),
  })),
}));

export const signUp = async (req: Request<{}, {}, IUser>, res: Response): Promise<void> => {
  const result = await UsersProvider.create(req.body);

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