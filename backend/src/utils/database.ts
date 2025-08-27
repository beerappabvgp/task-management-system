// backend/src/utils/database.ts
import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Test database connection
export const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
    
    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    logger.info('Database query test successful:', result);
    
    return true;
  } catch (error) {
    logger.error('Database connection failed:', error);
    return false;
  }
};

export default prisma;

