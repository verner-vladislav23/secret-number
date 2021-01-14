import * as express from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');

import {
  authController,
  gameController,
  userController
} from './controllers'

class Express {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.applyPreMiddlewares();
    this.applyRoutes();

    console.log('test 1')
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
    const userRouter = userController.getRouter();

    this.app.use('/api/v1/auth', authRouter);
    this.app.use('/api/v1/game', gameRouter);
    this.app.use('/api/v1/user', userRouter);
  }
}

export default Express;
