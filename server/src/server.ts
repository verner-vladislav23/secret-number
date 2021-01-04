import Express from './Express';
import { createUserTable, deleteUserTable } from "./db/migrations/create-user-table";
import { createGameTable, deleteGameTable } from "./db/migrations/create-game-table";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYwOTc1MzIyNywiZXhwIjoxNjI1MzA1MjI3fQ.WiCqEPwxseXjCuGYfawqDJWUlXau80H3HYAaDAYIRoI
const app = new Express().app;

// createUserTable();
// deleteUserTable();

// createGameTable();
// deleteGameTable();

app.listen(3001, 'localhost', () =>
  console.log('server is running on 3001')
);
