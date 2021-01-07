import * as express from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');

import gameController from './controllers/GameController';
import authController from './controllers/AuthController';

class Express {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.applyPreMiddlewares();
    this.applyRoutes();
  }

  private applyPreMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors({
      origin: '*',
      optionsSuccessStatus: 200,
    }));
  }

  private applyRoutes(): void {
    const authRouter = authController.getRouter();
    const gameRouter = gameController.getRouter();

    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/game', gameRouter);
  }
}

export default Express;
