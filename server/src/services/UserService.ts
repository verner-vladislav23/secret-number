import DB from '../db/Postgre';
import { QueryResult } from 'pg';
import * as bcrypt from 'bcrypt';

type SqlQuery = string

class UserService {
  static async getUserByLogin (login: string) {
    const GET_USER_BY_LOGIN_QUERY: SqlQuery = `
      SELECT * FROM "User" WHERE login = $1;
    `;

    try {
      const result: QueryResult = await DB.pool.query(
        GET_USER_BY_LOGIN_QUERY,
        [login]
      );
      const [user] = result.rows;

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById (id: number) {
    const GET_USER_BY_ID_QUERY: SqlQuery = `
      SELECT * FROM "User" WHERE id = $1
    `;

    try {
      const result: QueryResult = await DB.pool.query(
        GET_USER_BY_ID_QUERY,
        [id]
      );

      const [user] = result.rows;

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser (user) {
    const CREATE_USER_QUERY: SqlQuery = `
      INSERT INTO "User" (name, login, password)
      VALUES ($1, $2, $3);
    `;

    try {
      const { name, login, password } = user;
      const hashedPassword: string = bcrypt.hashSync(password, 10);

      await DB.pool.query(
        CREATE_USER_QUERY,
        [name, login, hashedPassword]
      );

      const createdUser = this.getUserByLogin(login);

      return createdUser;
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserService;
