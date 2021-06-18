import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';

export function createDBConnection(cb: Function) {
  createConnection({
    type: config.DB_TYPE as 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    logging: true,
    synchronize: true,
  })
    .then(() => {
      cb();
    })
    .catch((error) => {
      // TODO: use logger instead of console.error
      console.error(error);
    });
}
