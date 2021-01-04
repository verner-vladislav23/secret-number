import DB from '../Postgre';
import { QueryResult } from 'pg';

type SqlQuery = string

const createGameTable = async () => {
  const CREATE_GAME_TABLE_QUERY: SqlQuery = `
    CREATE TABLE "Game" (
      id              SERIAL PRIMARY KEY,
      user_id         SERIAL REFERENCES "User" NOT NULL,
      secret_number   VARCHAR(10) NOT NULL,
      level           INTEGER,
      finish_at       TIMESTAMP,
      created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;

  try {
    const result: QueryResult = await DB.pool.query(CREATE_GAME_TABLE_QUERY);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('ERROR: Create Game Table');
  }
};

const deleteGameTable = async () => {
  const DELETE_GAME_TABLE_QUERY: SqlQuery = 'DROP TABLE "Game";';

  try {
    const result: QueryResult = await DB.pool.query(DELETE_GAME_TABLE_QUERY);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('ERROR: Delete Game Table');
  }
};

export { createGameTable, deleteGameTable }
