import { PrismaClient } from '@prisma/client';

// Création d'une instance globale de PrismaClient pour éviter
// de multiples connexions en développement
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
