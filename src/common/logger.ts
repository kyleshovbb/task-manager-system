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

enum MorganMessagePart {
  error = 'ERROR_HTTP_LOG',
  success = 'SUCCESS_HTTP_LOG',
  method = 'METHOD:',
  url = 'URL:',
  statusCode = 'STATUS_CODE:',
  responseTime = 'RESPONSE_TIME:',
  query = 'QUERY:',
  body = 'BODY:',
}

const loggerStream: StreamOptions = {
  write: (message) =>
    message.includes(MorganMessagePart.error)
      ? logger.error(message)
      : logger.http(message),
};

function parseMorganTokens(
  tokens: TokenIndexer,
  req: MorganRequest,
  res: MorganResponse
): string {
  const getMethod = tokens['method'];
  const methodInfo = `${MorganMessagePart.method} ${
    (getMethod && getMethod(req, res)) || '-'
  }`;

  const getUrl = tokens['url'];
  const urlInfo = `${MorganMessagePart.url} ${
    (getUrl && getUrl(req, res)) || '-'
  }`;

  const getStatusCode = tokens['status'];
  const statusCode = getStatusCode && getStatusCode(req, res);
  const statusCodeInfo = `${MorganMessagePart.statusCode} ${statusCode || '-'}`;

  const getResponseTime = tokens['response-time'];
  const responseTimeInfo = `${MorganMessagePart.responseTime} ${
    (getResponseTime && getResponseTime(req, res)) || '-'
  }ms`;

  const queryInfo = `${MorganMessagePart.query} ${JSON.stringify(req.query)}`;

  const bodyInfo = `${MorganMessagePart.body} ${JSON.stringify(req.body)}`;

  const logStatus =
    statusCode && Number(statusCode) >= 400
      ? MorganMessagePart.error
      : MorganMessagePart.success;

  return `${logStatus} ${statusCodeInfo}; ${methodInfo}; ${urlInfo}; ${queryInfo}; ${bodyInfo} ${responseTimeInfo}`;
}

export const serverLoggerMiddleware = morgan(parseMorganTokens, {
  stream: loggerStream,
});
