import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import errorHandler from './middleware/errorHandler';
import {
  logger,
  LogStatuses,
  parseErrorToLog,
  serverLoggerMiddleware,
} from './common/logger';

const app = express();
const swaggerDocument = YAML.load(
  path.join(__dirname, '../doc/api.yaml')
) as Object;

app.use(express.json());
app.use(serverLoggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use(errorHandler);

process.on('uncaughtException', (error: Error) => {
  logger.error(parseErrorToLog(error, LogStatuses.uncaughtExceptionError));
});

process.on('unhandledRejection', (error: Error) => {
  logger.error(parseErrorToLog(error, LogStatuses.unhandledRejectionError));
});

export default app;
