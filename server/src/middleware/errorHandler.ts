import { Request, Response, ErrorRequestHandler } from 'express';
import { HttpStatus } from '../helpers/HttpStatus';

const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response): Response => {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
};

export default errorHandler;
