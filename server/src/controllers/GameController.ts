import { Request, Response, NextFunction, Router } from 'express';
import SecretNumberService from '../services/SecretNumberService';

class GameController {
  private _router: Router;

  constructor () {
    this._router = Router();

    this._router.post('/start', this._start);
    this._router.post('/move', this._move);
  }

  public getRouter (): Router {
    return this._router;
  }

  private _start (req: Request, res: Response, next: NextFunction): Response | void {
    const secretNumber: string = SecretNumberService.generateSecretNumber();

    return res.status(201).send({
      test: 300,
      secretNumber
    });
  }

  private _move (req: Request, res: Response, next: NextFunction): Response | void {

  }
}

export default new GameController();
