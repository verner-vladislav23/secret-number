import Express from './Express';

const app = new Express().app;

app.listen(3001, 'localhost', () =>
  console.log('server is running on 3001')
);
