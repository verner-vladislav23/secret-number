import { Request, Response, NextFunction } from 'express';

import BaseController from './BaseController';
import { GameService } from '../services';
import { HttpStatus } from '../helpers/HttpStatus';
import { Game, User } from '../db/models';
import authenticate from '../middleware/authenticate';

interface ModifiedRequest extends Request {
  user?: any;
}

class GameController extends BaseController {
  constructor () {
    super();

    this.router.post('/start', authenticate, this._start);
    this.router.post('/:id/move', authenticate, this._move);
  }

  private async _start (req: ModifiedRequest, res: Response, next: NextFunction): Promise<Response> {
    const { level } = req.body;
    const user:User = req.user;

    try {
      // const gameId = 11;
      const game: Game = await GameService.createGame(user.id, level);

      return res
        .status(HttpStatus.CREATED)
        .send({
          gameId: game.id,
          message: 'Game started'
        })
    } catch (error) {
      console.log(error);
    }
  }

  private async _move (req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { secretNumber } = req.body;
    const gameId = req.params.id;

    try {
      const { comparedNumber, finished }
      : ({ comparedNumber: string, finished: boolean }) = await GameService.move(gameId, secretNumber);

      return res
        .status(HttpStatus.OK)
        .send({
          comparedNumber,
          finished,
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export default new GameController();
