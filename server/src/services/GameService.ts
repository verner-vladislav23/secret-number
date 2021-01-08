import DB from '../db/Postgre';
import { QueryResult } from 'pg';

import SecretNumberService from './SecretNumberService';
import MoveService from './MoveService';
import { Game } from '../db/models';

type SqlQuery = string

class GameService {
  static async createGame (userId: number, level: number = 4): Promise<Game | undefined> {
    const CREATE_GAME_QUERY: SqlQuery = `
      INSERT INTO "Game" (user_id, secret_number, level)
      VALUES($1, $2, $3);
    `;

    const GET_LAST_GAME_QUERY: SqlQuery = `
      SELECT id, secret_number FROM "Game"
      WHERE user_id = $1 AND secret_number = $2 AND finish_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `;

    try {
      const secretNumber: string = SecretNumberService.generateSecretNumber(level);
      await DB.pool.query(
        CREATE_GAME_QUERY,
        [userId, secretNumber, level],
      );

      const result: QueryResult = await DB.pool.query(
        GET_LAST_GAME_QUERY,
        [userId, secretNumber],
      );

      const [lastGame] = result.rows;

      return lastGame;
    } catch (error) {
      console.log(error);
    }
  };

  static async move (gameId, inputNumber: string) {
    const SET_FINISH_GAME_BY_ID_QUERY: SqlQuery = `
      UPDATE "Game" SET finish_at = NOW()
      WHERE id = $1
    `;

    try {

      const gameById = await this.getGameById(gameId);
      // TODO: Проверка на finished


      const { secret_number } = gameById;

      const comparedNumber: string = SecretNumberService.getComparedNumber(inputNumber, secret_number);

      await MoveService.createMove(gameId, inputNumber);

      const finished: boolean = (secret_number === inputNumber);

      if (finished) {
        await DB.pool.query(
          SET_FINISH_GAME_BY_ID_QUERY,
          [gameById.id],
        );
      }

      return {
        comparedNumber,
        finished
      };
    } catch (error) {
      console.log(error);
    }
  };

  static async getGameById (gameId: number): Promise<Game | undefined> {
    const GET_GAME_BY_ID_QUERY: SqlQuery = `
      SELECT * FROM "Game" WHERE id = $1
    `;

    const result: QueryResult = await DB.pool.query(
      GET_GAME_BY_ID_QUERY,
      [gameId],
    );

    const [gameById] = result.rows;

    return gameById;
  };

  static async getGamesByUser (userId: number): Promise<Game[]> {
    const GET_GAMES_BY_USER: SqlQuery = `
      SELECT 
        id,
        level,
        created_at,
        updated_at,
        finish_at,
        (
          SELECT COUNT(*) FROM "Move" AS move
          WHERE move.game_id = game.id
        ) AS count_moves
      FROM "Game" AS game
      WHERE user_id = $1
    `;

    try {
      const result: QueryResult = await DB.pool.query(
        GET_GAMES_BY_USER,
        [userId]
      );

      return result.rows;
    } catch (error) {
      console.log(error);
    }
  };
}

export default GameService;
