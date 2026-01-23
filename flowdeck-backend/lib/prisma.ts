import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString =
  `${process.env.DATABASE_URL}` || `${process.env.DATABASE_URL_DEV}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Handle connection explicitly
prisma
  .$connect()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });

export { prisma };
