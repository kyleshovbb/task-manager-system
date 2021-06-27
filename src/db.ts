import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './common/config';
import UserEntity from './resources/users/user.entity';
import TaskEntity from './resources/tasks/task.entity';
import BoardEntity from './resources/boards/board.entity';
import { logger, parseErrorToLog } from './common/logger';
import { LogTypes } from './types/logger.types';

export function createDBConnection(cb: Function) {
  createConnection({
    type: config.DB_TYPE as 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.POSTGRES_DB,
    username: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [UserEntity, TaskEntity, BoardEntity],
    cli: { migrationsDir: 'src/migrations' },
  })
    .then(() => {
      cb();
    })
    .catch((error) => {
      logger.error(parseErrorToLog(error, LogTypes.DBConnectionError));
    });
}
