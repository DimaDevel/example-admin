const { app } = require('./server');
const connect = require('./db/db');

const port = 3000;

Promise.all([
  connect(),
  app.listen(port),
]).then(() => {
  info(`Started on port ${port}`);
});
