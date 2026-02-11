import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import errorHandler from '@/middleware/error.middleware.js';
import notFoundHandler from '@/middleware/notFound.middleware.js';
import { env } from '@/config/env.js';
import type { Request, Response, NextFunction } from 'express';

const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());d

const corsOptions =
  env.NODE_ENV === 'production'
    ? {
        origin: env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      }
    : {
        origin: true,
        credentials: true,
      };
app.use(cors(corsOptions));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

app.use('/api', apiLimiter);
// use authLimiter for auth routes
// Health check endpoint
app.get('/health', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({
    status: 'OK',
    date: new Date().toISOString(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
