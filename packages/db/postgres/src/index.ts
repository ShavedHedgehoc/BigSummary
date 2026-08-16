import { PrismaClient, Prisma } from './generated/index.js';
export const pgPrisma = new PrismaClient();
export { Prisma };
export * from './generated/index.js';
