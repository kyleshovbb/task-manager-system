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
  method = 'METHOD:',
  url = 'URL:',
  status = 'STATUS:',
  responseTime = 'RESPONSE_TIME:',
  query = 'QUERY:',
  body = 'BODY:',
  error = 'ERROR_MESSAGE:',
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

  const getStatus = tokens['status'];
  const statusCode = getStatus && getStatus(req, res);
  const statusInfo = `${MorganMessagePart.status} ${statusCode || '-'}`;

  const getResponseTime = tokens['response-time'];
  const responseTimeInfo = `${MorganMessagePart.responseTime} ${
    (getResponseTime && getResponseTime(req, res)) || '-'
  }ms`;

  const queryInfo = `${MorganMessagePart.query} ${JSON.stringify(req.query)}`;

  const bodyInfo = `${MorganMessagePart.body} ${JSON.stringify(req.body)}`;

  const isError = statusCode && Number(statusCode) >= 400;

  if (isError) {
    const errorMessageInfo = `${MorganMessagePart.error} ${res.statusMessage}`;
    return `${statusInfo}; ${errorMessageInfo}; ${methodInfo}; ${urlInfo}; ${queryInfo}; ${bodyInfo}; ${responseTimeInfo}`;
  }

  return `${statusInfo}; ${methodInfo}; ${urlInfo}; ${queryInfo}; ${bodyInfo}; ${responseTimeInfo}`;
}

export const serverLoggerMiddleware = morgan(parseMorganTokens, {
  stream: loggerStream,
});
