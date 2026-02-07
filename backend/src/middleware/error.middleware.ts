import AppError from '@/utils/appError.utils.js';
import { ZodError } from 'zod';
import zodErrorHandler from '@/utils/zodErrorHandler.utils.js';
import type { Request, Response, NextFunction } from 'express';
import { env } from '@/config/env.js';

type ErrorResponse = {
  error: string;
  errors?: unknown;
  stack?: string;
};

const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const isDev = env.NODE_ENV === 'development';

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const appError = zodErrorHandler(err);
    const response: ErrorResponse = {
      error: appError.message,
    };
    if (appError.errors) {
      response.errors = appError.errors;
    }
    if (isDev && appError.stack) {
      response.stack = appError.stack;
    }
    return res.status(appError.statusCode).json(response);
  }

  // Handle AppError instances
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      error: err.message,
    };
    if (err.errors) {
      response.errors = err.errors;
    }
    if (isDev && err.stack) {
      response.stack = err.stack;
    }
    return res.status(err.statusCode).json(response);
  }

  // Handle all other errors
  console.error('Unhandled error:', err);

  const statusCode = 500;
  const response: ErrorResponse = {
    error: !isDev ? 'Internal server error' : err instanceof Error ? err.message : 'Unknown error',
  };
  if (isDev && err instanceof Error && err.stack) {
    response.stack = err.stack;
  }
  return res.status(statusCode).json(response);
};

export default errorHandler;
