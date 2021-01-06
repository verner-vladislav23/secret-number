import Express from './Express';
import { createUserTable, deleteUserTable } from "./db/migrations/create-user-table";
import { createGameTable, deleteGameTable } from "./db/migrations/create-game-table";

const app = new Express().app;

// createUserTable();
// deleteUserTable();

// createGameTable();
// deleteGameTable();

app.listen(3001, 'localhost', () =>
  console.log('server is running on 3001')
);
