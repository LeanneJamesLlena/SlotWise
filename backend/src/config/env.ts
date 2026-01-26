import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLIENT_URL: z.string().url().optional(),
  PORT: z.coerce.number().default(4000),

  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
