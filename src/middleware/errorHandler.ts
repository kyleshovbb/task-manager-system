import { ErrorRequestHandler } from 'express';

interface ServerError {
  message: string;
  statusCode?: number;
  [key: string]: any;
}

const errorHandler: ErrorRequestHandler = (
  err: ServerError,
  _req,
  res,
  _next
) => {
  const message = err.message || 'Internal Server Error';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ message });
};

export default errorHandler;
