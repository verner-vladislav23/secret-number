import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserService } from '../services';
import { HttpStatus } from '../helpers/HttpStatus';
import { User } from '../db/models';

const parseBearerToken = (req: Request): string | undefined => {
  const token = req.headers ? req.headers.authorization : undefined;
  if (!Boolean(token)) {
    return undefined;
  }

  return token
    .replace(/Bearer/g, '')
    .trim();
};

interface ModifiedRequest extends Request {
  user?: any;
}

const authenticate = async (req: ModifiedRequest, res: Response, next: NextFunction) => {

  try {
    const token = parseBearerToken(req);

    if (!Boolean(token)) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Not Authorized' });
    }

    const decoded = jwt.verify(token, 'SECRET_NUMBER_APP');

    const user: User = await UserService.getUserById(decoded.userId);
    const isExistUser = Boolean(user);

    if (isExistUser) {
      req.user = user;
      return next();
    }

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: 'Неправильный логин или пароль' });
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: 'Not Authorized' });
  }
};

export default authenticate;
