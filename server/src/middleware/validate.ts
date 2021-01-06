import { Request, Response, NextFunction, Handler } from 'express';
import { HttpStatus } from '../helpers/HttpStatus';

const validate = (
  schema
): Handler => async (req: Request, res: Response, next: NextFunction) => {

  try {
    console.log(typeof req.body.password);
    const params = { ...req.body, ...req.query, ... req.params };
    await schema.validate(params);

    return next();
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: error })
  }
};

export default validate;
