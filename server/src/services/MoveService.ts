import { QueryResult } from 'pg';

import DB from '../db/Postgre';
import { Move } from '../db/models';
type SqlQuery = string

class MoveService {
  static async createMove (gameId: number, inputNumber: string): Promise<Move | undefined> {
    const CREATE_MOVE_QUERY: SqlQuery = `
      INSERT INTO "Move" (game_id, input_number)
      VALUES ($1, $2)
    `;

    const GET_LAST_MOVE_QUERY: SqlQuery = `
      SELECT id, game_id, input_number FROM "Move"
      WHERE game_id = $1 AND input_number = $2
      ORDER BY created_at DESC
      LIMIT 1
    `;

    await DB.pool.query(
      CREATE_MOVE_QUERY,
      [gameId, inputNumber],
    );

    const result: QueryResult = await DB.pool.query(
      GET_LAST_MOVE_QUERY,
      [gameId, inputNumber],
    );

    const [createdMove] = result.rows;

    return createdMove;
  }
}

export default MoveService;
