import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';

export function createConnectionToDB(cb: Function) {
  createConnection({
    type: config.DB_TYPE as 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: [],
    logging: true,
    synchronize: true,
  })
    .then((connection) => {
      cb(connection);
    })
    .catch((error) => console.error(error));
}
