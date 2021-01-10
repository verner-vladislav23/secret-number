import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { HttpStatus } from '../helpers/HttpStatus';

const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ errorMessage: error.message });
};

export default errorHandler;
