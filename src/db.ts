import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';
import UserEntity from './resources/users/user.entity';

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
    entities: [UserEntity],
  })
    .then(() => {
      cb();
    })
    .catch((error) => {
      // TODO: use logger instead of console.error
      console.error(error);
    });
}
