import DB from '../Postgre';

type SqlQuery = string

const createUserTable = async () => {
  const CREATE_USER_TABLE_QUERY: SqlQuery = `
    CREATE TABLE "User"(
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(30) NOT NULL,
      login       varchar(30) NOT NULL UNIQUE,
      password    VARCHAR(64) NOT NULL,
      created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  try {
    const result = await DB.pool.query(CREATE_USER_TABLE_QUERY);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('ERROR: Create User Table');
  }
};

const deleteUserTable = async () => {
  const DELETE_USER_TABLE_QUERY: SqlQuery = `DROP TABLE "User";`;

  try {
    const result = await DB.pool.query(DELETE_USER_TABLE_QUERY);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log('ERROR: Delete User Table');
  }
};

export { createUserTable, deleteUserTable };
