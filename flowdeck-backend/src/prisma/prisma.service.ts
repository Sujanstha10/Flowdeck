import 'dotenv/config';
import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger = new Logger('PrismaService');
  private pool: Pool;

  constructor() {
    const connectionString =
      process.env.DATABASE_URL || process.env.DATABASE_URL_DEV;

    // Create a single pool instance
    const pool = new Pool({
      connectionString,
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Use the pool with the adapter
    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: ['query', 'error', 'warn'],
    });

    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Database connection successful');
    } catch (error) {
      this.logger.error('❌ Database connection failed', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      await this.pool.end();
      this.logger.log('✅ Database disconnected');
    } catch (error) {
      this.logger.error('❌ Error disconnecting database', error);
      throw error;
    }
  }
}
