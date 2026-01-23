import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { successResponse } from 'src/common/helper/response.helper';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.ADMIN)
  @Get()
  @CacheKey('users')
  async getUsers() {
    const users = await this.userService.getUsers();

    return successResponse('Users fetched successfully', users, users.length);
  }
}
