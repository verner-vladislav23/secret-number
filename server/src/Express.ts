import * as express from 'express';
import * as bodyParser from 'body-parser';

class Express {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.applyPreMiddlewares();
    this.initRoutes();
  }

  private applyPreMiddlewares(): void {
    this.app.use(bodyParser.json());
  }

  private initRoutes(): void {
    this.app.get('/api/test', (req, res) => {
      return res.status(200).json({ test: 300 });
    })
  }
}

export default Express;
