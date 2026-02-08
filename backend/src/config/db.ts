import { PrismaClient } from '@prisma/client';
import { env } from '@/config/env.js';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('DB connected via Prisma');
  } catch (error) {
    console.error('DB connection error:', error);
    throw error;
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log('DB disconnected via Prisma');
  } catch (error) {
    console.error('DB disconnection error:', error);
  }
};
