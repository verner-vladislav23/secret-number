import { QueryResult } from 'pg';
import DB from '../Postgre';

type SqlQuery = string

const createMoveTable = async () => {
  const CREATE_MOVE_TABLE_QUERY: SqlQuery = `
    CREATE TABLE "Move" (
      id              SERIAL PRIMARY KEY,
      game_id         SERIAL REFERENCES "Game" NOT NULL,
      input_number    VARCHAR(10) NOT NULL,
      created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  try {
    const result: QueryResult = await DB.pool.query(CREATE_MOVE_TABLE_QUERY);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('ERROR: Create Move TAble');
  }
};

const deleteMoveTable = async () => {
  const DELETE_MOVE_TABLE_QUERY: SqlQuery = 'DROP TABLE "Move";';

  try {
    const result: QueryResult = await DB.pool.query(DELETE_MOVE_TABLE_QUERY);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('ERROR: Delete Game Table');
  }
};

export { createMoveTable, deleteMoveTable };
