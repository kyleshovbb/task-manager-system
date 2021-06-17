import app from './app';
import config from './common/config';
import { createConnectionToDB } from './db';

createConnectionToDB(() => {
  app.listen(config.PORT, () => {
    process.stdout.write(`App is running on http://localhost:${config.PORT}\n`);
  });
});
