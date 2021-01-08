import Express from './Express';
import { createUserTable, deleteUserTable } from "./db/migrations/create-user-table";
import { createGameTable, deleteGameTable } from "./db/migrations/create-game-table";
import { createMoveTable, deleteMoveTable } from "./db/migrations/create-move-table";

const app = new Express().app;

// createUserTable();
// deleteUserTable();

// createGameTable();
// deleteGameTable();

// createMoveTable();
// deleteMoveTable();

app.listen(3001, 'localhost', () =>
  console.log('server is running on 3001')
);
