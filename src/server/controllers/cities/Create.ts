import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';


interface ICity {
  name: string;
  state: string;
};

interface IFilter {
  filter?: string;
};


export const createValidation = validation({
  body: yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(2),
  }),
  query: yup.object().shape({
    filter: yup.string().required().min(3),
  }),
});







// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  console.log(req.body);

  return res.send('Create!');
};