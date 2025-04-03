import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";


interface ICity {
  name: string;
  estado: string;
};

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
  name: yup.string().required().min(3),
  estado: yup.string().required().min(2),
});



export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  let validatedData: ICity | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      //if(error.path === undefined) return
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  console.log(validatedData);

  return res.send("Create!");
};