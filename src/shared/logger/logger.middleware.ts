import { Injectable, NestMiddleware } from '@nestjs/common';
import morgan, { StreamOptions } from 'morgan';
import { LoggerService } from './logger.service';
import {
  MorganMessagePart,
  TokenIndexer,
  LogTypes,
  MorganRequest,
  MorganResponse,
} from './interfaces/logger.interfaces';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private loggerStream: StreamOptions = {
    write: (message) =>
      message.includes(LogTypes.httpError)
        ? this.logger.httpError(message)
        : this.logger.http(message),
  };

  constructor(private logger: LoggerService) {}

  use = morgan(this.parseMorganTokens.bind(this), {
    stream: this.loggerStream,
  });

  private parseMorganTokens(
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
    const statusCodeInfo = `${MorganMessagePart.statusCode} ${
      statusCode || '-'
    }`;

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
}
