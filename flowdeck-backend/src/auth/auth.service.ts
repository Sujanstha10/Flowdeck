import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { prisma } from 'lib/prisma';
import {
  errorResponse,
  successResponse,
} from 'src/common/helper/response.helper';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  // REGISTER USER
  async register(dto: RegisterDto) {
    try {
      const exists = await prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (exists) throw new UnauthorizedException('Email already registered');

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
        },
      });

      return successResponse(
        'User registered successfully',
        await this.signToken(user.id, user.email, user.name, user.role),
      );
    } catch (error: any) {
      return errorResponse('User registration failed', error.message);
    }
  }

  // LOGIN USER
  async login(dto: LoginDto) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const match = await bcrypt.compare(dto.password, user.password);
      if (!match) throw new UnauthorizedException('Invalid credentials');
      const token = await this.signToken(
        user.id,
        user.email,
        user.name,
        user.role,
      );
      return successResponse('User logged in successfully', token);
    } catch (error: any) {
      return errorResponse('User login failed', error.message);
    }
  }

  // SIGN JWT
  async signToken(userId: string, email: string, name: string, role: string) {
    const payload = { sub: userId, email, name, role };
    return {
      accessToken: await this.jwt.signAsync(payload),
    };
  }
}
