import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { prisma } from 'lib/prisma';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getUsers() {
    // const cacheKey = 'users';

    // // 1️⃣ Try cache first
    // const cachedUsers = await this.cacheManager.get(cacheKey);
    // if (cachedUsers) {
    //   return cachedUsers;
    // }

    // 2️⃣ Fetch from DB
    const users = await prisma.user.findMany();

    // 3️⃣ Store in cache (TTL 5 minutes)
    // await this.cacheManager.set(cacheKey, users);

    return users;
  }
}
