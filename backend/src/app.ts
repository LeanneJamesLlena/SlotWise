import express from 'express';
import cors from 'cors';
import { env } from '@/config/env.js';
import type { Request, Response } from 'express';

const app = express();

if (env.NODE_ENV === 'production' && env.CLIENT_URL) {
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    })
  );
}

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    date: new Date().toISOString(),
  });
});

console.log(`test env variable: ${env.NODE_ENV}`);

export default app;
