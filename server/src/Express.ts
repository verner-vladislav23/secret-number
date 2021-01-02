import * as express from 'express';
import * as bodyParser from 'body-parser';

import GameController from "./controllers/GameController";

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
    const gameRouter = GameController.getRouter();

    this.app.use('/api/v1/game', gameRouter);

    this.app.get('/api/v1/test', (req, res) => {
      return res.status(200).json({ test: 300 });
    });

    this.app.post('/api/v1/compare')
  }
}

export default Express;
