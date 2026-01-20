import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { prisma } from 'lib/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
