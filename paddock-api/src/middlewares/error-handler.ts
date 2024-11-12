import util from 'util';
import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import { type ApiError } from '@/lib/errors';
import logger from '@/lib/logger';
import environment from '@/lib/environment';

interface ErrorBody {
  success: false;
  message: string;
  rawErrors?: string[];
  stack?: string;
}

const safeStringify = (obj: any): string => {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: string, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular Reference]';
        }
        seen.add(value);
      }
      return value;
    };
  };

  try {
    return JSON.stringify(obj, getCircularReplacer(), 2);
  } catch (error) {
    return '[Unable to stringify error]';
  }
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  // Create a sanitized error object for logging
  const sanitizedError = {
    message: err.message,
    statusCode: err.statusCode,
    rawErrors: err.rawErrors,
    stack: err.stack,
  };

  logger.error(`Request Error:
        \nError:\n${safeStringify(sanitizedError)}
        \nHeaders:\n${util.inspect(req.headers)}
        \nParams:\n${util.inspect(req.params)}
        \nQuery:\n${util.inspect(req.query)}
        \nBody:\n${util.inspect(req.body)}`);

  const status: number = err.statusCode ?? HttpStatusCode.InternalServerError;
  const errorBody: ErrorBody = {
    success: false,
    message: err.message,
    rawErrors: err.rawErrors,
  };

  if (environment.isDev()) {
    errorBody.stack = err.stack;
  }

  return res.status(status).json(errorBody);
};

export default errorHandler;
