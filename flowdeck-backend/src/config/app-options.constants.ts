import KeyvRedis, { Keyv } from '@keyv/redis';
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { CacheableMemory } from 'cacheable';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    // const store = await redisStore({
    //   socket: {
    //     host: configService.get<string>('127.0.0.1'),
    //     port: parseInt(configService.get<string>('6379')!),
    //   },
    // });
    return {
      //   store: () => store,
      stores: [
        new Keyv({
          store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
        }),
        new KeyvRedis('redis://localhost:6379'),
      ],
    };
  },
  inject: [ConfigService],
};
