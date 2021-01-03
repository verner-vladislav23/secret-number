import Express from './Express';
import { createUserTable, deleteUserTable } from "./db/migrations/create-user-table";

const app = new Express().app;

// createUserTable();
// deleteUserTable();

app.listen(3001, 'localhost', () =>
  console.log('server is running on 3001')
);
