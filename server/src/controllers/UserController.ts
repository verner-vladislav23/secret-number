import { Request, Response, NextFunction } from 'express';

import BaseController from "./BaseController";
import authenticate from '../middleware/authenticate'
import { User } from '../db/models';

interface ModifiedRequest extends Request {
  user?: any;
}

class UserController extends BaseController {
  constructor() {
    super();

    this.router.get('/current', authenticate, this.current);
  }

  public current (req: ModifiedRequest, res: Response, next: NextFunction): Response {
    const user: User = req.user;

    return res.status(200).json(user);
  }
}

export default new UserController();
