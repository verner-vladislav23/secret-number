import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

import BaseController from './BaseController';
import { UserService, AuthService } from '../services';
import { HttpStatus } from '../helpers/HttpStatus';
import { loginSchema, registrationSchema } from '../schemas/auth';
import errorHandler from '../middleware/errorHandler';
import validate from '../middleware/validate';

class AuthController extends BaseController {
  constructor () {
    super();

    this.router.post('/login', validate(loginSchema), this.login);
    this.router.post('/registration', validate(registrationSchema), this.registration);

    this.router.use(errorHandler)
  }

  public async login (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { login, password } = req.body;

    try {
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
    } catch (error) {
      next(error?.message);
    }
  }

  public async registration (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { name, login, password } = req.body;

    try {

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

    } catch (error) {
      next(error?.message)
    }
  }
}

export { AuthController }
export default new AuthController();
