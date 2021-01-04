import { Router } from 'express';

class BaseController {
  protected router: Router;

  constructor () {
    this.router = Router();
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default BaseController;
