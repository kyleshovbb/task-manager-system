import { format, transports, createLogger } from 'winston';
import { LogTypes } from '../types/logger.types';

export const logger = createLogger({
  level: 'http',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'logs/full.log', level: 'http' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
  exitOnError: true,
});

export function parseErrorToLog(error: Error, logType: LogTypes) {
  return `${logType}; ERROR_MESSAGE: ${error.message}; ERROR_STACK: ${
    error.stack || '-'
  };`;
}
