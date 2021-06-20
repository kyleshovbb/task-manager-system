import morgan, { TokenCallbackFn, StreamOptions } from 'morgan';
import { Response, Request } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { logger } from '../common/logger';
import { LogTypes } from '../types/logger.types';

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

enum MorganMessagePart {
  method = 'METHOD:',
  url = 'URL:',
  statusCode = 'STATUS_CODE:',
  responseTime = 'RESPONSE_TIME:',
  query = 'QUERY:',
  body = 'BODY:',
}

const loggerStream: StreamOptions = {
  write: (message) =>
    message.includes(LogTypes.httpError)
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

  const logType =
    statusCode && Number(statusCode) >= 400
      ? LogTypes.httpError
      : LogTypes.httpSuccess;

  return `${logType} ${statusCodeInfo}; ${methodInfo}; ${urlInfo}; ${queryInfo}; ${bodyInfo} ${responseTimeInfo}`;
}

export const loggerMiddleware = morgan(parseMorganTokens, {
  stream: loggerStream,
});
