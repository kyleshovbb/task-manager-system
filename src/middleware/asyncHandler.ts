import { NextFunction, Response, Request, RequestHandler } from 'express';

interface ParamsDictionary {
  [key: string]: string;
}

export default function asyncHandler<T = ParamsDictionary>(
  fn: RequestHandler<T>
) {
  return (req: Request<T>, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}
