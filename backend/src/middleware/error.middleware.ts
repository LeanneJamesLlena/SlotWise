import AppError from '@/utils/appError.utils.js'; 
import type { Request, Response, NextFunction } from 'express';
import { env } from '@/config/env.js';

type ErrorResponse = {
    error: string;
    errors?: unknown;
    stack?: string;
}

const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    const isDev = env.NODE_ENV === 'development';

    if (err instanceof AppError) {
        const response: ErrorResponse = {
            error: err.message,
        };
        if (err.errors) {
            response.errors = err.errors;
        };

        if (isDev && err.stack) {
            response.stack = err.stack;
        }
        return res.status(err.statusCode).json(response);
    }


    console.error('Unhandled error:', err);

    const statusCode = 500;
    const response: ErrorResponse= {
        error: !isDev ? 'Internal server error' : err instanceof Error ? err.message : 'Unknown error',
    };
    if (isDev && err instanceof Error && err.stack) {
        response.stack = err.stack;
    };
    return res.status(statusCode).json(response);

};

export default errorHandler;