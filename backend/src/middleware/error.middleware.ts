import AppError from '@/utils/appError.utils.js'; 
import type { Request, Response, NextFunction } from 'express';
import { env } from '@/config/env.js';


export const errorHandler = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        const response: {
            error: string;
            errors?: unknown;
            stack?: string;
        } = {
            error: err.message,
        };
        if (err.errors) {
            response.errors = err.errors;
        };

        if (env.NODE_ENV === 'development' && err.stack) {
            response.stack = err.stack;
        }
        return res.status(err.statusCode).json(response);
    }
};