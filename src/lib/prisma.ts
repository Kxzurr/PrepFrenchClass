import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create pool lazily to avoid connection errors at startup
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });
  }
  return pool;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg(getPool()),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
