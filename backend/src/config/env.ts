import { z } from 'zod';


const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    CLIENT_URL: z.string().url().optional(),
})


export const env = envSchema.parse(process.env);