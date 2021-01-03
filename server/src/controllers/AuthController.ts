import { Request, Response, NextFunction, Router } from 'express';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import { HttpStatus } from '../helpers/HttpStatus';
import * as bcrypt from 'bcrypt';

class AuthController {
  private _router: Router;

  constructor () {
    this._router = Router();

    this._router.post('/login', this._login);
    this._router.post('/registration', this._registration);
  }

  public getRouter (): Router {
    return this._router;
  }

  private async _login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { login, password } = req.body;

    const user = await UserService.getUserByLogin(login);

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({
          error: 'Not Authorized'
        })
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({
          error: 'Not Authorized'
        });
    }

    const token = AuthService.generateAccessToken(user);

    return res
      .status(200)
      .send({
        token,
      });
  }

  private async _registration (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, login, password } = req.body;

    const existedUser = await UserService.getUserByLogin(login);
    const isExistUser: boolean = Boolean(existedUser);

    if (isExistUser) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          error: 'Такой login уже существует',
        })
    }
    const user = await UserService.createUser({
      name,
      login,
      password,
    });

    const token: string = AuthService.generateAccessToken(user);

    return res
      .status(HttpStatus.CREATED)
      .json({
        message: 'Success',
        token,
      });
  }
}

export default new AuthController();