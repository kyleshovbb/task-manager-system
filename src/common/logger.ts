import morgan, { TokenCallbackFn, StreamOptions } from 'morgan';
import { Response, Request } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { format, transports, createLogger } from 'winston';

interface RequestQuery {
  query: {
    [key: string]: string | undefined;
  };
}

type MorganRequest = Request & IncomingMessage & RequestQuery;

type MorganResponse = Response & ServerResponse;

interface TokenIndexer {
  [tokenName: string]: TokenCallbackFn<MorganRequest, MorganResponse>;
}

export const logger = createLogger({
  level: 'http',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/http.log', level: 'http' }),
  ],
  exitOnError: true,
});

const loggerStream: StreamOptions = {
  write: (message) => logger.http(message),
};

function parseMorganTokens(
  tokens: TokenIndexer,
  req: MorganRequest,
  res: MorganResponse
): string {
  const getMethod = tokens['method'];
  const methodInfo = `METHOD: ${(getMethod && getMethod(req, res)) || '-'}`;

  const getUrl = tokens['url'];
  const urlInfo = `URL: ${(getUrl && getUrl(req, res)) || '-'}`;

  const getStatus = tokens['status'];
  const statusInfo = `STATUS: ${(getStatus && getStatus(req, res)) || '-'}`;

  const getResponseTime = tokens['response-time'];
  const responseTimeInfo = `RESPONSE_TIME: ${
    (getResponseTime && getResponseTime(req, res)) || '-'
  }ms`;

  const queryInfo = `QUERY: ${JSON.stringify(req.query)}`;

  const bodyInfo = `BODY: ${JSON.stringify(req.body)}`;

  return `${methodInfo}; ${urlInfo}; ${statusInfo}; ${queryInfo}; ${bodyInfo}; ${responseTimeInfo}`;
}

export const serverLoggerMiddleware = morgan(parseMorganTokens, {
  stream: loggerStream,
});
