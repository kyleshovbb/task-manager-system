import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import checkAuth from './middleware/auth.middleware';
import authRouter from './resources/auth/auth.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import errorHandler from './middleware/error.handler';
import { LogTypes } from './types/logger.types';
import { loggerMiddleware } from './middleware/logger.middleware';
import { logger, parseErrorToLog } from './common/logger';

const app = express();
const swaggerDocument = YAML.load(
  path.join(__dirname, '../doc/api.yaml')
) as Object;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(authRouter);
app.use(checkAuth);

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use(errorHandler);

process.on('uncaughtException', (error: Error) => {
  logger.error(parseErrorToLog(error, LogTypes.uncaughtExceptionError));
});

process.on('unhandledRejection', (error: Error) => {
  logger.error(parseErrorToLog(error, LogTypes.unhandledRejectionError));
});

export default app;
