import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/app-options.constants';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    PrismaModule,
    UserModule,
    AuthModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    UserService,
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
