import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@/config/env.js';

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('DB conneted via Prisma');
  } catch (error) {
    console.error('DB connection error:', error);
    process.exit(1);
  }
};
