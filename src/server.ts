import app from './app';
import config from './common/config';
import { createDBConnection } from './db';

createDBConnection(() => {
  app.listen(config.PORT, () => {
    process.stdout.write(`App is running on http://localhost:${config.PORT}\n`);
  });
});
