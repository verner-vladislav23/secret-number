import { Pool, PoolConfig } from 'pg';

const defaultConfig: PoolConfig = {
  user: 'a1',
  host: 'localhost',
  database: 'secret_number',
  password: '',
  port: 5432,
};

class DB {
  private _databaseConfig: PoolConfig;
  public pool: Pool;

  constructor (config?: PoolConfig) {
    this._databaseConfig = config || defaultConfig;
    this.connect();
  }

  public async connect (): Promise<void> {
    this.pool = new Pool(this._databaseConfig);
  }
}

export default new DB();
