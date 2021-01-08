import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

import BaseController from './BaseController';
import { UserService, AuthService } from '../services';
import { HttpStatus } from '../helpers/HttpStatus';
import { loginSchema, registrationSchema } from '../schemas/auth';
import validate from '../middleware/validate';

class AuthController extends BaseController {
  constructor () {
    super();

    this.router.post('/login', validate(loginSchema), this._login);
    this.router.post('/registration', validate(registrationSchema), this._registration);
  }

  private async _login (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { login, password } = req.body;

    const user = await UserService.getUserByLogin(login);

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({
          errorMessage: 'Некорректный логин или пароль'
        })
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({
          errorMessage: 'Некорректный логин или пароль'
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
          errorMessage: 'Такой логин уже существует',
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
