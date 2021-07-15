import { Injectable, Logger } from '@nestjs/common';
import {
  format,
  transports,
  createLogger,
  Logger as WinstonLogger,
} from 'winston';
import { LogTypes } from './interfaces/logger.interfaces';

@Injectable()
export class LoggerService extends Logger {
  private readonly logger: WinstonLogger = createLogger({
    level: 'http',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
      new transports.File({ filename: 'logs/full.log', level: 'http' }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        handleExceptions: true,
      }),
    ],
    exitOnError: true,
  });

  http(message: string) {
    this.logger.http(message);
  }

  httpError(message: string) {
    this.logger.error(message);
  }

  error(message: string, trace?: string, context?: string) {
    const errorLogMessage = `${
      LogTypes.uncaughtError
    }; ERROR_MESSAGE: ${message}; ERROR_TRACE: ${
      trace || '-'
    }; ERROR_CONTEXT: ${context || '-'}`;

    this.logger.error(errorLogMessage);
  }
}
