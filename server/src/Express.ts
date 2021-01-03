import * as express from 'express';
import * as bodyParser from 'body-parser';

import GameController from './controllers/GameController';
import AuthController from './controllers/AuthController';

class Express {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.applyPreMiddlewares();
    this.applyRoutes();
  }

  private applyPreMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private applyRoutes(): void {
    const authRouter = AuthController.getRouter();
    const gameRouter = GameController.getRouter();

    this.app.use('/api/v1/game', gameRouter);
    this.app.use('/api/v1/auth', authRouter);
  }
}

export default Express;
