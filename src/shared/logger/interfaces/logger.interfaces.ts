import { TokenCallbackFn } from 'morgan';
import { IncomingMessage, ServerResponse } from 'http';

export enum LogTypes {
  httpError = '[HTTP_ERROR_LOG]',
  httpSuccess = '[HTTP_SUCCESS_LOG]',
  uncaughtError = '[UNCAUGHT_ERROR]',
}

export interface TokenIndexer {
  [tokenName: string]: TokenCallbackFn<MorganRequest, MorganResponse>;
}

export enum MorganMessagePart {
  method = 'METHOD:',
  url = 'URL:',
  statusCode = 'STATUS_CODE:',
  responseTime = 'RESPONSE_TIME:',
  query = 'QUERY:',
  body = 'BODY:',
}

export type MorganRequest = Request & IncomingMessage & RequestQuery;

export type MorganResponse = Response & ServerResponse;

interface RequestQuery {
  query: {
    [key: string]: string | undefined;
  };
}
