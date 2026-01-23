import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }
  async getUserSingleUser(id?: string) {
    const users = await this.prisma.user.findUnique({ where: { id } });

    return users;
  }
}
