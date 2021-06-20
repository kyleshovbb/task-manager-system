import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';
import UserEntity from './resources/users/user.entity';
import TaskEntity from './resources/tasks/task.entity';
import BoardEntity from './resources/boards/board.entity';

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
    entities: [UserEntity, TaskEntity, BoardEntity],
  })
    .then(() => {
      cb();
    })
    .catch((error) => {
      // TODO: use logger instead of console.error
      console.error(error);
    });
}
