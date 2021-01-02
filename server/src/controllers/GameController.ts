import { Request, Response, NextFunction, Router } from 'express';
import SecretNumberService from '../services/SecretNumberService';

class GameController {
  private _router: Router;

  constructor () {
    this._router = Router();

    this._router.post('/start', this.start);
    this._router.post('/move', this.move);
  }

  public getRouter (): Router {
    return this._router;
  }

  public start (req: Request, res: Response, next: NextFunction): Response | void {
    const secretNumber: string = SecretNumberService.generateSecretNumber();

    return res.status(201).send({
      test: 300,
      secretNumber
    });
  }

  public move (req: Request, res: Response, next: NextFunction): Response | void {

  }
}

export default new GameController();
