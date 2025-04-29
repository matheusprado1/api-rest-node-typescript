import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> { };

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().min(5).email(),
    password: yup.string().required().min(6),
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
  const { email, password } = req.body

  const result = await UsersProvider.getByEmail(email);
  if (result instanceof Error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      }
    });
    return;
  }

  if (password !== result.password) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos',
      }
    });
    return;
  } else {
    res.status(StatusCodes.OK).json({ accessToken: 'teste.teste.teste' });
    return
  }
};

