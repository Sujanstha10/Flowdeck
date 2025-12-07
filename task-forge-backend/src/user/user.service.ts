import { Injectable } from '@nestjs/common';
import { prisma } from 'lib/prisma';

@Injectable()
export class UserService {
  async getUsers(): Promise<any> {
    try {
      return await prisma.user.findMany();
    } catch (error) {}
  }
}
